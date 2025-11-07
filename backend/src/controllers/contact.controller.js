const Contact = require("../models/contact.model");
const sendMail = require("../utils/mailer");

// 📥 Create a new contact (public)
const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Save to DB
    const newContact = await Contact.create({ name, email, subject, message });

    // Send email
    await sendMail(name, email, subject, message);

    res.status(201).json({ success: true, message: "Message sent successfully!", contact: newContact });
  } catch (err) {
    console.error("❌ Contact error:", err);
    res.status(500).json({ success: false, message: "Server error sending contact message." });
  }
};

// 📤 Get all contacts (admin only)
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    console.error("❌ Error fetching contacts:", err);
    res.status(500).json({ success: false, message: "Server error fetching contacts." });
  }
};

module.exports = {
  createContact,
  getContacts,
};
