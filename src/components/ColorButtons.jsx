import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function ColorButtons({ text, color, func }) {
  let buttonElement;

  switch (color) {
    case "green":
      buttonElement = (
        <Button variant="contained" color="success" onClick={func}>
          {text}
        </Button>
      );
      break;

    case "red":
      buttonElement = (
        <Button variant="outlined" color="error" onClick={func}>
          {text}
        </Button>
      );
      break;

    default:
      buttonElement = (
        <Button variant="text" onClick={func}>
          {text}
        </Button>
      );
  }

  return (
    <Stack direction="row" spacing={2}>
      {buttonElement}
    </Stack>
  );
}
