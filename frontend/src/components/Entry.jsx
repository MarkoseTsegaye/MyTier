import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Entry = ({ props }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: 'auto',
        boxShadow: 3,
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'transform 0.2s',
        ':hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      {props.picture && (
        <CardMedia
          component="img"
          alt={props.title}
          height="200"
          image={props.picture}
          sx={{
            objectFit: 'cover',
          }}
        />
      )}
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {props.title || 'Untitled'}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'center' }}
        >
          Author: {props.author || 'Unknown'}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'center', mt: 1 }}
        >
          Type: {props.type || 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Entry;
