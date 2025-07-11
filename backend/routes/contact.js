const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Contact Message Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const ContactMessage = mongoose.model('ContactMessage', contactSchema);

// Contact form submission
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const message = new ContactMessage({
      name,
      email,
      message
    });

    await message.save();
    res.status(200).json({ message: 'Message received successfully' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ message: 'Error saving message' });
  }
});

// Get all messages (admin only)
router.get('/', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ timestamp: -1 });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

module.exports = router;
