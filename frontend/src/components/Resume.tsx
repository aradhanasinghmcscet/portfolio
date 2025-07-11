import React, { useState, useEffect } from 'react';
import styles from './Resume.module.scss';
import { Box, Typography, Container, Grid, Paper, Chip, List, ListItem, ListItemText, ListItemIcon, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { getResume } from '../services/api';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useMediaQuery } from '@mui/material';
import { Experience, Project, Skill, Achievement, Education, ResumeData } from '../types/resume';

// Remove this interface since we're using state instead of props

// 3D Effect Styles
const containerStyle = {
  perspective: '1000px',
  transformStyle: 'preserve-3d',
  position: 'relative',
  overflow: 'visible',
};

const cardStyle = {
  position: 'relative',
  transformStyle: 'preserve-3d',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateZ(20px) rotateX(5deg) rotateY(5deg)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  },
};

const timelineItemStyle = {
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transform: 'translateZ(-1px)',
    background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
  },
};

const chipStyle = {
  transform: 'translateZ(10px)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateZ(20px)',
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
  },
};

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const Resume: React.FC = () => {
  const theme = useTheme();
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await getResume();
        setResumeData(response.data);
      } catch (err) {
        setError('Failed to fetch resume data');
        console.error('Error fetching resume:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Loading Resume...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Error: {error}
        </Typography>
      </Container>
    );
  }

  if (!resumeData) {
    return null;
  }

  return (
    <Container maxWidth="lg" id="resume" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Resume
        </Typography>
        {resumeData.profile.githubRepo && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <a href={resumeData.profile.githubRepo} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <Button variant="outlined" color="primary" startIcon={<GitHubIcon />}>View Source Code</Button>
            </a>
          </Box>
        )}
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Experience
              </Typography>
              <DragDropContext onDragEnd={(result) => console.log(result)}>
                <Droppable droppableId="experience">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {resumeData.experience.map((experience: Experience, index: number) => (
                        <Draggable key={experience.company} draggableId={experience.company} index={index}>
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <TimelineItem>
                                <TimelineOppositeContent>
                                  <Typography variant="subtitle1" color="text.secondary">
                                    {experience.duration}
                                  </Typography>
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                  <TimelineDot color="primary" variant="outlined" />
                                  <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>
                                  <Paper elevation={3} sx={{ p: 3 }}>
                                    <Typography variant="h6" component="h3" gutterBottom>
                                      {experience.position}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                      {experience.company}
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                      {experience.location}
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                      {experience.duration}
                                    </Typography>
                                    <List>
                                      {experience.description.map((desc: string, index: number) => (
                                        <ListItem key={index} disablePadding>
                                          <ListItemIcon>
                                            <Box component="span" sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: theme.palette.primary.main }} />
                                          </ListItemIcon>
                                          <ListItemText primary={desc} />
                                        </ListItem>
                                      ))}
                                    </List>
                                    {experience.techStack && experience.techStack.length > 0 && (
                                      <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {experience.techStack.map((tech: string, index: number) => (
                                          <Chip key={index} label={tech} size="small" color="primary" />
                                        ))}
                                      </Box>
                                    )}
                                  </Paper>
                                </TimelineContent>
                              </TimelineItem>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Skills
              </Typography>
              {resumeData.skills.map((skill: Skill, index: number) => (
                <Paper key={index} elevation={2} sx={{ p: 3, mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {skill.category}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                    {skill.technologies.map((tech: string, techIndex: number) => (
                      <Chip key={techIndex} label={tech} size="small" color="primary" />
                    ))}
                  </Box>
                </Paper>
              ))}
            </Box>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Achievements
              </Typography>
              {resumeData.achievements.map((achievement: Achievement, index: number) => (
                <Paper key={index} elevation={2} sx={{ p: 3, mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {achievement.title}
                  </Typography>
                  <List>
                    {achievement.items.map((item: string, itemIndex: number) => (
                      <ListItem key={itemIndex} disablePadding>
                        <ListItemIcon>
                          <Box component="span" sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: theme.palette.primary.main }} />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              ))}
            </Box>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Education
              </Typography>
              {resumeData.education.map((edu: Education, index: number) => (
                <Paper key={index} elevation={2} sx={{ p: 3, mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {edu.degree}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {edu.institution}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {edu.duration}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default Resume;
