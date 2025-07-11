const express = require('express');
const router = express.Router();

// Sample skills data - In a real application, this would come from MongoDB
const skills = [
  { id: '1', name: 'UI/UX Design', level: 90 },
  { id: '2', name: 'Frontend Development', level: 95 },
  { id: '3', name: 'MERN Stack', level: 90 },
  { id: '4', name: 'Node.js', level: 85 },
  { id: '5', name: 'Splunk', level: 80 },
  { id: '6', name: 'Adobe', level: 85 },
];

// Get all skills
router.get('/', (req, res) => {
  res.json(skills);
});

// Get single skill
router.get('/:id', (req, res) => {
  const skill = skills.find(s => s.id === req.params.id);
  if (!skill) return res.status(404).json({ message: 'Skill not found' });
  res.json(skill);
});

module.exports = router;
