const express = require('express');
const router = express.Router();

// Sample project data - In a real application, this would come from MongoDB
const projects = [
  {
    id: '1',
    title: 'Enterprise Dashboard',
    description: 'A comprehensive dashboard for enterprise analytics built with React and Splunk integration.',
    technologies: ['React', 'Node.js', 'Splunk', 'Material-UI'],
    image: '/project-images/dashboard.png',
    demo: '#',
    github: '#',
  },
  {
    id: '2',
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce solution with MERN stack and advanced UI/UX features.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux'],
    image: '/project-images/ecommerce.png',
    demo: '#',
    github: '#',
  },
  {
    id: '3',
    title: 'UI/UX Design System',
    description: 'A reusable design system created with Adobe XD and Figma for consistent UI across applications.',
    technologies: ['Adobe XD', 'Figma', 'HTML5', 'CSS3'],
    image: '/project-images/design-system.png',
    demo: '#',
    github: '#',
  },
];

// Get all projects
router.get('/', (req, res) => {
  res.json(projects);
});

// Get single project
router.get('/:id', (req, res) => {
  const project = projects.find(p => p.id === req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
});

module.exports = router;
