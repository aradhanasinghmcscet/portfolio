import React, { useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';

interface StarRatingProps {
  initialValue?: number;
  disabled?: boolean;
  onRate?: (rating: number) => void;
  size?: 'small' | 'medium' | 'large';
}

const StarRating: React.FC<StarRatingProps> = ({
  initialValue = 0,
  disabled = false,
  onRate,
  size = 'medium'
}) => {
  const [rating, setRating] = useState<number>(initialValue);
  const [hover, setHover] = useState<number | null>(null);

  const handleRate = (value: number) => {
    if (!disabled) {
      setRating(value);
      if (onRate) {
        onRate(value);
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {[...Array(5)].map((_, index) => {
        const value = index + 1;
        return (
          <Tooltip
            key={index}
            title={`${value} stars`}
            placement="top"
          >
            <span>
              <IconButton
                onClick={() => handleRate(value)}
                onMouseEnter={() => setHover(value)}
                onMouseLeave={() => setHover(null)}
                size={size}
                disabled={disabled}
                sx={{
                  color: '#ffd700',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#ffd700',
                  },
                }}
              >
                {value <= (hover || rating) ? <Star /> : <StarBorder />}
              </IconButton>
            </span>
          </Tooltip>
        );
      })}
    </Box>
  );
};

export default StarRating;
