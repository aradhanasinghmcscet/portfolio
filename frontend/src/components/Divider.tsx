import React from 'react';
import { Box } from '@mui/material';
import styles from './Divider.module.scss';

interface DividerProps {
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ className }) => {
  return (
    <Box className={`${styles.divider} ${className || ''}`} />
  );
};

export default Divider;
