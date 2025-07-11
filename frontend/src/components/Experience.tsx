import React from 'react';
import styles from './Experience.module.scss';
import { Box, Typography, Paper, Container, Chip } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { motion } from 'framer-motion';
import type { Experience } from '../types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const experiences: Experience[] = [
  {
    role: 'Senior Full Stack Developer',
    company: 'Current Company',
    period: '2023 - Present',
    description: 'Leading development of enterprise applications using MERN stack and implementing advanced UI/UX solutions.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Material-UI'],
  },
  {
    role: 'Frontend Developer',
    company: 'Previous Company',
    period: '2021 - 2023',
    description: 'Developed responsive web applications with React and integrated with backend services.',
    technologies: ['React', 'Redux', 'REST APIs', 'CSS3', 'HTML5'],
  },
  {
    role: 'UI/UX Designer',
    company: 'Design Studio',
    period: '2019 - 2021',
    description: 'Created user-centered designs and wireframes for web and mobile applications.',
    technologies: ['Figma', 'Adobe XD', 'User Testing', 'Prototyping'],
  },
];

interface ExperienceProps {
  id: string;
}

const ExperienceComponent: React.FC<ExperienceProps> = ({ id }) => {
  return (
     <DndProvider backend={HTML5Backend}>
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Experience
      </Typography>
      <Box sx={{ mt: 4 }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Timeline position="alternate">
            {experiences.map((exp, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent>
                  <Typography variant="subtitle1" color="text.secondary">
                    {exp.period}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      {exp.role}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                      {exp.company}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {exp.description}
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {exp.technologies.map((tech, i) => (
                        <Chip key={i} label={tech} size="small" />
                      ))}
                    </Box>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </motion.div>
      </Box>
    </Container>
    </DndProvider>
  );
};

export default ExperienceComponent;
