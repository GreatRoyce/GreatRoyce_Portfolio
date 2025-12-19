const Admin = require("../models/Admin.model");
const jwt = require("jsonwebtoken");
const sendSecurityAlert = require("../utils/sendSecurityAlert");

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Admin Login
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  // Always select password explicitly
  const admin = await Admin.findOne({ email }).select("+password");

  // Generic response (prevents user enumeration)
  if (!admin) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // 🔒 Check lock status
  if (admin.lockUntil && admin.lockUntil > Date.now()) {
    return res.status(423).json({
      error: "Account temporarily locked. Try again later.",
    });
  }

  const isMatch = await admin.matchPassword(password);

  // ❌ Wrong password
  if (!isMatch) {
    admin.failedLoginAttempts += 1;

    // 🔐 Lock account after exactly 2 failed attempts
    if (admin.failedLoginAttempts === 2) {
      admin.lockUntil = Date.now() + 15 * 60 * 1000; // 15 minutes

      // 📧 Send security alert (once)
      await sendSecurityAlert({
        ip: req.ip,
        userAgent: req.headers["user-agent"],
        time: new Date().toLocaleString(),
      });
    }

    await admin.save();

    return res.status(401).json({ error: "Invalid credentials" });
  }

  // ✅ Successful login — reset security fields
  admin.failedLoginAttempts = 0;
  admin.lockUntil = null;
  await admin.save();

  res.status(200).json({
    message: "Admin logged in",
    token: generateToken(admin._id),
  });
};
