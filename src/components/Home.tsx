
import { Box, Typography, Grid, Container, Button, useTheme, useMediaQuery, Card, CardContent} from '@mui/material';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { styled } from '@mui/material/styles';
import { auto } from '@popperjs/core';

interface HomeProps {
  id: string;
}

const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: '1400px',
  padding: '2rem',
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  component: 'h1',
  fontFamily: 'var(--font-roboto)',
  fontWeight: 700,
  lineHeight: 1.4,
  marginBottom: '1.5rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.5rem',
  },
}));

const StyledSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-roboto)',
  fontSize: '1.25rem',
  lineHeight: 1.6,
  color: 'rgba(255, 255, 255, 0.9)',
  marginBottom: '2rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '1rem',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: '25px',
  padding: '0.75rem 2rem',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  [theme.breakpoints.down('md')]: {
    padding: '0.5rem 1.5rem',
  },
}));

const HomeComponent: FC<HomeProps> = ({ id }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width:auto,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1976d2 0%, #dc004e 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: 'url(/pattern-bg.svg) no-repeat center center',
          opacity: 0.1,
          pointerEvents: 'none',
        }}
      />

      <StyledContainer>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <StyledTitle variant='h2'>
                Aradhana's Tech Odyssey
              </StyledTitle>
              <StyledSubtitle>
                Web Developer | Full Stack Developer | UI/UX Expert | MERN Specialist
              </StyledSubtitle>

              {/* UI/UX Experience Showcase */}
              <Box>
                <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Typography variant="h5" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 2 }}>
                    UI/UX Design Expertise
                  </Typography>
                  
                  <Grid container spacing={2}>
                    {/* Design Tools Card */}
                    <Grid item xs={12} sm={6}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <Card 
                          sx={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(4px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: 2,
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-5px)',
                              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                            }
                          }}
                        >
                          <CardContent>
                            <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
                              Design Tools Mastery
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                              Expert in Adobe Creative Suite, Figma, and Sketch for crafting seamless user experiences
                            </Typography>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>

                    {/* Web Development Card */}
                    <Grid item xs={12} sm={6}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        <Card 
                          sx={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(4px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: 2,
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-5px)',
                              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                            }
                          }}
                        >
                          <CardContent>
                            <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
                              Full Stack Development
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                              Expert in building scalable web applications with modern technologies
                            </Typography>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>

                    {/* UX Principles Card */}
                    <Grid item xs={12} sm={6}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        <Card 
                          sx={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(4px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: 2,
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-5px)',
                              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                            }
                          }}
                        >
                          <CardContent>
                            <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
                              UX Principles
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                              Deep understanding of user-centered design, accessibility, and responsive layouts
                            </Typography>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  </Grid>
                </Box>
              </Box>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <StyledButton
                  variant="contained"
                  size={isMobile ? 'small' : 'large'}
                  sx={{
                    backgroundColor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.light',
                    },
                  }}
                >
                  View My Work
                </StyledButton>
              </motion.div>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box
                sx={{
                  height: '400px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem'
                }}
              >
                {/* Add content here */}
                <img 
                  src={process.env.PUBLIC_URL + '/DSC03682.JPG'} 
                  alt="Profile" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '16px'
                  }}
                />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </StyledContainer>
    </Box>
  );
};

export default HomeComponent;
