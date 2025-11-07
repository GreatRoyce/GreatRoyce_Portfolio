const express = require("express");
const router = express.Router();
const { createContact, getContacts } = require("../controllers/contact.controller");
const protect = require("../middleware/authMiddleware");

// Public route: anyone can send a message
router.post("/", createContact);

// Admin-only: view all messages
router.get("/", protect, getContacts);

module.exports = router;
