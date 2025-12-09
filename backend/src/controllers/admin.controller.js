const Admin = require("../models/Admin.model");
const jwt = require("jsonwebtoken");

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Admin Login
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ error: "Invalid credentials" });

  const isMatch = await admin.matchPassword(password);
  if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

  res.status(200).json({
    message: "Admin logged in",
    token: generateToken(admin._id),
  });
};
