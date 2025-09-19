import * as React from "react";
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
} from "@mui/material";

export const ContactPage = () => {
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Contact form submitted:", formData);
        alert("Thanks for reaching out! We'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Typography
                variant="h4"
                gutterBottom
                align="center"
                fontWeight={700}
            >
                Contact Me
            </Typography>
            <Typography
                variant="body1"
                color="text.secondary"
                align="center"
                sx={{ mb: 4 }}
            >
                Feel free to reach out using the form below.
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
                <TextField
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    label="Your Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    label="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    fullWidth
                    required
                    multiline
                    rows={4}
                />

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{ alignSelf: "center", mt: 2 }}
                >
                    Send Message
                </Button>
            </Box>
        </Container>
    );
};
