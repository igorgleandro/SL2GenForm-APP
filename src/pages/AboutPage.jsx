import * as React from "react";
import { Container, Typography, Box } from "@mui/material";

export const AboutPage = () => {
    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Typography
                variant="h3"
                component="h1"
                gutterBottom
                fontWeight={700}
                align="center"
            >
                About Us
            </Typography>

            <Typography
                variant="body1"
                color="text.secondary"
                align="center"
                sx={{ mb: 6 }}
            >
                Welcome to our project! This is a simple About Page built with React
                and Material UI. Here you can share information about who you are,
                what you do, and what your project is about.
            </Typography>

            <Box sx={{ textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                    Our Mission
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    To deliver clean, modern, and user-friendly web experiences using
                    React, Material UI, and thoughtful design practices.
                </Typography>

                <Typography variant="h5" gutterBottom>
                    Our Values
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Innovation, collaboration, and attention to detail. We believe every
                    project deserves a great user experience.
                </Typography>
            </Box>
        </Container>
    );
};