import React, { useState } from 'react';
import styles from './Projects.module.scss';
import { Box, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button, Chip, Container, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { motion } from 'framer-motion';
import { Project } from '../types/resume';
import { resumeData } from '../data/resume';
import StarRating from './StarRating';

interface ProjectsProps {
  id: string;
}

const projects: readonly Project[] = resumeData.projects;

const Projects: React.FC<ProjectsProps> = ({ id }) => {
  const [rating, setRating] = useState<number>(0);
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" gutterBottom align="center">
          Projects
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {projects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {project.title}
                    </Typography>
                    <List>
                      {Array.isArray(project.description) ? 
                        project.description.map((desc: string, index: number) => (
                          <ListItem key={index} disablePadding>
                            <ListItemIcon>
                              <Box component="span" sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
                            </ListItemIcon>
                            <ListItemText primary={desc} />
                          </ListItem>
                        )) 
                        : 
                        <ListItem disablePadding>
                          <ListItemIcon>
                            <Box component="span" sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
                          </ListItemIcon>
                          <ListItemText primary={project.description} />
                        </ListItem>
                      }
                    </List>
                    <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {project.technologies.map((tech, techIndex) => (
                        <Chip key={techIndex} label={tech} size="small" color="primary" />
                      ))}
                    </Box>
                    <div>  
                    <StarRating
                       initialValue={rating}
                       onRate={setRating}
          size="medium"
        /></div>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Projects;
