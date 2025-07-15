import React from 'react';
import { Box, Typography, Paper, Container, Chip } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { motion } from 'framer-motion';
import type { Experience } from '../types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const experiences: Experience[] = [
  {
    role: 'AVP',
    company: 'JPMorgan Chase & Co.',
    period: 'April 2023 - Present',
    description: 'Accomplished UI/Frontend Technical Development with a proven track record in leading end-to-end modernization of enterprise-grade lending applications, including AOA Business Lending and Home Lending platforms. Spearheaded digital transformation efforts, migrating legacy systems to modern architectures using ReactJS, Spring Boot, Python, Cypress, and data analytics tools like Splunk and Adobe Analytics. Adept at managing cross-functional teams, driving Agile delivery, and integrating emerging AI capabilities to enhance user experience and operational efficiency. Recognized as 2nd place winner in the JPMC Global Hackathon 2024 (UK) for innovative problem-solving and product innovation.',
    technologies: ['ReactJS', 'Spring Boot', 'Python', 'Cypress', 'Splunk', 'Adobe Analytics', 'AI', 'Agile'],
  },
  {
    role: 'SR. LEAD SOFTWARE ENGINEER',
    company: 'Collins Aerospace',
    period: 'April 2020 - Feb 2023',
    description: 'Muse – Airport Project (Full-Stack Leadership & Modernization Initiative)\nPlayed a pivotal role as a full-stack developer and team contributor in the design, development, and migration of new and existing features for a high-impact Airport Operations project. Led the end-to-end design, architecture, and development of the AIM Rail product, functioning as both an independent contributor and the technical architect.',
    technologies: ['ReactJS', 'Node.js', 'JSX', 'CSS', 'PostgreSQL', 'MongoDB', 'Socket.io', 'React Bootstrap', 'Material UI', 'Express', 'Electron'],
  },
  {
    role: 'UI Technical LEad Developer',
    company: 'Wipro Pvt. LTD.',
    period: 'June 2018 – April 2020',
    description: 'Conducted user research and developed user personas to inform product design and development. Designed user flows, wireframes, and prototypes for a mobile app that won several industry awards. Worked closely with the development team to ensure designs were implemented accurately and efficiently.',
    technologies: ['HTML5', 'CSS3', 'Bootstrap', 'React JS', 'Angular 7', 'gruntjs', 'hybris'],
  },
  {
    role: 'Senior UI Developer',
    company: 'IBM India Pvt Ltd',
    period: 'April 2013 – April 2018',
    description: 'Working directly with customers to establish project scope, interaction guidelines, and project timelines. Leading the development of websites for clients, built advanced UI frameworks for web applications, and established design patterns for rapid prototyping of websites.',
    technologies: ['HTML5', 'CSS3', 'Bootstrap', 'React JS', 'Angular 7', 'gruntjs', 'hybris'],
  },
  {
    role: 'UI Front-End Developer',
    company: 'Microsoft (Payroll Company- Affluent)',
    period: 'OCT 2012 – April 2013',
    description: 'Worked on Win8 Metro applications development as a part of POC team using Visual studio, XAML, CRM, HTML5, JavaScript, jQuery.',
    technologies: ['Visual Studio', 'XAML', 'CRM', 'HTML5', 'JavaScript', 'jQuery'],
  },
  {
    role: 'UI Developer',
    company: 'AON Hewitt (Payroll Company)',
    period: 'SEP 2011 – May 2012',
    description: 'Worked as a contractor designing YBR, Gateway, and Nucleus web products for System and Mobile Applications for different clients.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Advanced JavaScript'],
  },
  {
    role: 'Software Engineer',
    company: 'Aequor Information Technology',
    period: 'May 2010 – June 2011',
    description: 'Started career as a foreshore, learning and working on several technologies including HTML, CSS, JavaScript, jQuery, .Net, and Java Struts framework.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery', '.Net', 'Java Struts'],
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
