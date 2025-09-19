import * as React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate, useRouteError } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";


export default function ErrorPage() {
    const navigate = useNavigate();
    const error = useRouteError();

    return (
        <>
           <NavBar/>
            <Container
                maxWidth="sm"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "80vh",
                    textAlign: "center",
                }}
            >
                <Typography variant="h1" component="h1" color="error" fontWeight={700}>
                    {error?.status || 404}
                </Typography>

                <Typography variant="h4" gutterBottom>
                    {error?.statusText || "Page Not Found"}
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    {error?.data ||
                        "Sorry, the page you’re looking for doesn’t exist or an unexpected error has occurred."}
                </Typography>

                <Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/")}
                        sx={{ mr: 2 }}
                    >
                        Go Home
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => navigate(-1)}
                    >
                        Go Back
                    </Button>
                </Box>
            </Container>
        </>
    );
}

