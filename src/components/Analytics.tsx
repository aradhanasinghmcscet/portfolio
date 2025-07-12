import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, Container, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';
import type { AnalyticsData } from '../types';

interface AnalyticsProps {
  id: string;
}

const Analytics: React.FC<AnalyticsProps> = ({ id }) => {
  const [stats, setStats] = useState<AnalyticsData>({
    totalVisits: 0,
    uniqueVisitors: 0,
    averageTime: '00:00',
    pageViews: {},
  });
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('https://plausible.io/api/v1/stats/aggregate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            site_id: 'your-site-id',
            period: '30d',
            metrics: ['visitors', 'pageviews', 'visit_duration'],
          }),
        });
        const data = await response.json();
        setStats({
          totalVisits: data.visitors,
          uniqueVisitors: data.unique_visitors,
          averageTime: data.average_visit_duration,
          pageViews: {}, // We'll need to implement page views separately
        });
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };

    fetchAnalytics();
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Analytics
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {/* Stats Grid */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Overview
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="subtitle1">
                    Total Visits
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {stats.totalVisits}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="subtitle1">
                    Unique Visitors
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {stats.uniqueVisitors}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="subtitle1">
                    Average Time
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {stats.averageTime}
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          {/* Page Views Grid */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Page Views
                </Typography>
                {Object.entries(stats.pageViews).map(([page, views]) => (
                  <Box key={page} sx={{ mb: 2 }}>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      {page.replace('/', 'Home')}
                    </Typography>
                    <Box sx={{ width: '100%' }}>
                      <LinearProgress
                        variant="determinate"
                        value={(views / Math.max(...Object.values(stats.pageViews))) * 100}
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 5,
                          },
                        }}
                      />
                      <Typography variant="caption" sx={{ mt: 1 }}>
                        {views} views
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Analytics;
