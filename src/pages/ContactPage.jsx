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
        <Container
            maxWidth="sm"
            sx={{ py: 8 }}
            className="dark:bg-gray-800 transition-colors duration-300"
        >
            <Typography
                variant="h4"
                gutterBottom
                align="center"
                fontWeight={700}
                className="text-gray-900 dark:text-white transition-colors duration-300"
            >
                Contact Me
            </Typography>
            <Typography
                variant="body1"
                align="center"
                sx={{ mb: 4 }}
                className="text-gray-600 dark:text-gray-300 transition-colors duration-300"
            >
                Feel free to reach out using the form below.
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    p: 4,
                    borderRadius: 2
                }}
                className="bg-white dark:bg-gray-700 shadow-lg dark:shadow-gray-900/30 transition-colors duration-300"
            >
                <TextField
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    required
                    className="[&_.MuiInputLabel-root]:text-gray-700 [&_.MuiInputLabel-root]:dark:text-gray-300 [&_.MuiOutlinedInput-root]:dark:text-white [&_.MuiOutlinedInput-notchedOutline]:dark:border-gray-600"
                />
                <TextField
                    label="Your Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    required
                    className="[&_.MuiInputLabel-root]:text-gray-700 [&_.MuiInputLabel-root]:dark:text-gray-300 [&_.MuiOutlinedInput-root]:dark:text-white [&_.MuiOutlinedInput-notchedOutline]:dark:border-gray-600"
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
                    className="[&_.MuiInputLabel-root]:text-gray-700 [&_.MuiInputLabel-root]:dark:text-gray-300 [&_.MuiOutlinedInput-root]:dark:text-white [&_.MuiOutlinedInput-notchedOutline]:dark:border-gray-600"
                />

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                        alignSelf: "center",
                        mt: 2,
                        backgroundColor: '#3b82f6',
                        '&:hover': {
                            backgroundColor: '#2563eb',
                        }
                    }}
                    className="dark:bg-green-600 dark:hover:bg-green-700 transition-colors duration-300"
                >
                    Send Message
                </Button>
            </Box>
        </Container>
    );
};