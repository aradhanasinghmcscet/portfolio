import React from 'react';
import styles from './Skills.module.scss';
import { Box, Typography, Grid, Paper, CircularProgress, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { Skill } from '../types';
import StarRating from './StarRating';

const skills: Skill[] = [
  { name: 'UI/UX Design', level: 90 },
  { name: 'Frontend Development', level: 95 },
  { name: 'MERN Stack', level: 90 },
  { name: 'Node.js', level: 85 },
  { name: 'AWS EC2, Lambda, S3', level: 70 },
  { name: 'Splunk', level: 80 },
  { name: 'Adobe', level: 85 },
];

interface SkillsProps {
  id: string;
}

const Skills: React.FC<SkillsProps> = ({ id }) => {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Skills
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {skills.map((skill, index) => {
            // Convert percentage to star rating (1-5 stars)
            const starRating = Math.ceil(skill.level / 20);
            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      p: 3,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <Box sx={{ mb: 2 }}>
                      <CircularProgress
                        variant="determinate"
                        value={skill.level}
                        size={100}
                        sx={{
                          color: 'primary.main',
                          '& .MuiCircularProgress-circle': {
                            strokeLinecap: 'round',
                          },
                        }}
                      />
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {skill.name}
                    </Typography>
                    <StarRating
                      initialValue={starRating}
                      disabled={true}
                      size="medium"
                    />
                    <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
                      {skill.level}%
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default Skills;
