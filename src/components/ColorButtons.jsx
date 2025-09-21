import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import VisibilityIcon from "@mui/icons-material/Visibility";

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
        <Button variant="contained" color="error" onClick={func}>
          {text}
        </Button>
      );
      break;

           case "blue":
              buttonElement = (
                  <Button variant="outlined" startIcon={<VisibilityIcon />} onClick={func}>
                      {text}
                  </Button>
              );
              break

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
