import React, { useState } from 'react';
import { Box, Typography, Grid, TextField, Button, Container, Snackbar, Alert, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import styles from './Contact.module.scss';
import { MailOutline, Call, LocationOn } from '@mui/icons-material';
import Divider from './Divider';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface ContactProps {
  id: string;
}

const Contact: React.FC<ContactProps> = ({ id }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    setSuccess(true);
  };

  return (
    <>
      <Divider />
      <Container id={id} maxWidth="lg">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.contactContainer}
      >
        <Typography variant="h4" component="h1" gutterBottom className={styles.title}>
          Get in Touch
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} className={styles.contactInfo}>
              <Typography variant="h6" gutterBottom className={styles.infoTitle}>
                Contact Information
              </Typography>
              <div className={styles.infoItems}>
                <div className={styles.infoItem}>
                  <MailOutline className={styles.infoIcon} />
                  <Typography variant="body1">
                    Email: your.email@example.com
                  </Typography>
                </div>
                <div className={styles.infoItem}>
                  <Call className={styles.infoIcon} />
                  <Typography variant="body1">
                    Phone: +1 234 567 890
                  </Typography>
                </div>
                <div className={styles.infoItem}>
                  <LocationOn className={styles.infoIcon} />
                  <Typography variant="body1">
                    Location: Your Location
                  </Typography>
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} className={styles.formContainer}>
              <form onSubmit={handleSubmit} className={styles.contactForm}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={styles.formGroup}
                >
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className={styles.textField}
                  />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className={styles.formGroup}
                >
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className={styles.textField}
                  />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className={styles.formGroup}
                >
                  <TextField
                    fullWidth
                    label="Message"
                    variant="outlined"
                    multiline
                    rows={4}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className={styles.textField}
                  />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className={styles.submitButtonContainer}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    fullWidth
                    className={styles.submitButton}
                  >
                    Send Message
                  </Button>
                </motion.div>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
      {success && (
        <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
          <Alert onClose={() => setSuccess(false)} severity="success">
            Message sent successfully!
          </Alert>
        </Snackbar>
      )}
      </Container>
      <Divider />
    </>
  );
};

export default Contact;