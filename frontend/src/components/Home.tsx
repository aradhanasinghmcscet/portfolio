import React from 'react';
import styles from './Home.module.scss';
import { Box, Typography, Grid, Container, Button, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { styled } from '@mui/material/styles';

interface HomeProps {
  id: string;
}

const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: '1400px',
  padding: '2rem',
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-roboto)',
  fontWeight: 700,
  lineHeight: 1.4,
  marginBottom: '1.5rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
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
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <StyledTitle>
                Aradhana's Tech Odyssey
              </StyledTitle>
              <StyledSubtitle>
                Full Stack Developer | UI/UX Expert | MERN Specialist
              </StyledSubtitle>
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
          </Grid>
          <Grid item xs={12} md={6}>
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
                }}
              >
                <img
                  src="/DSC03719.JPG"
                  alt="Profile"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '16px',
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
