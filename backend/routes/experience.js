const express = require('express');
const router = express.Router();

// Sample experience data - In a real application, this would come from MongoDB
const experiences = [
  {
    id: '1',
    role: 'Senior Full Stack Developer',
    company: 'Current Company',
    period: '2023 - Present',
    description: 'Leading development of enterprise applications using MERN stack and implementing advanced UI/UX solutions.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Material-UI'],
  },
  {
    id: '2',
    role: 'Frontend Developer',
    company: 'Previous Company',
    period: '2021 - 2023',
    description: 'Developed responsive web applications with React and integrated with backend services.',
    technologies: ['React', 'Redux', 'REST APIs', 'CSS3', 'HTML5'],
  },
  {
    id: '3',
    role: 'UI/UX Developer',
    company: 'Previous Company',
    period: '2019 - 2021',
    description: 'Created intuitive user interfaces and optimized user experience across multiple platforms.',
    technologies: ['Adobe XD', 'Figma', 'HTML5', 'CSS3', 'JavaScript'],
  },
];

// Get all experiences
router.get('/', (req, res) => {
  res.json(experiences);
});

// Get single experience
router.get('/:id', (req, res) => {
  const experience = experiences.find(e => e.id === req.params.id);
  if (!experience) return res.status(404).json({ message: 'Experience not found' });
  res.json(experience);
});

module.exports = router;
