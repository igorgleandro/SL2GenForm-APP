import * as React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate, useRouteError } from "react-router-dom";


export default function ErrorPage() {
    const navigate = useNavigate();
    const error = useRouteError();

    return (

            <Container
                maxWidth="sm"
                className="flex flex-col items-center justify-center min-h-[80vh] text-center bg-transparent dark:bg-gray-900"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "80vh",
                    textAlign: "center",
                }}
            >
                <Typography
                    variant="h1"
                    component="h1"
                    fontWeight={700}
                    className="text-red-500 dark:text-red-400"
                    sx={{
                        fontSize: { xs: '4rem', sm: '6rem' },
                        mb: 2,
                    }}
                >
                    {error?.status || 404}
                </Typography>

                <Typography
                    variant="h4"
                    gutterBottom
                    className="text-gray-900 dark:text-white"
                    sx={{ mb: 2 }}
                >
                    {error?.statusText || "Page Not Found"}
                </Typography>

                <Typography
                    variant="body1"
                    className="text-gray-600 dark:text-gray-400 mb-8"
                    sx={{ mb: 4 }}
                >
                    {error?.data ||
                        "Sorry, the page you're looking for doesn't exist or an unexpected error has occurred."}
                </Typography>

                <Box className="flex gap-4 flex-wrap justify-center">
                    <Button
                        variant="contained"
                        onClick={() => navigate("/")}
                        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                        sx={{
                            textTransform: "none",
                            px: 3,
                            py: 1.5,
                            borderRadius: 2,
                        }}
                    >
                        Go Home
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => navigate(-1)}
                        className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        sx={{
                            textTransform: "none",
                            px: 3,
                            py: 1.5,
                            borderRadius: 2,
                        }}
                    >
                        Go Back
                    </Button>
                </Box>
            </Container>

    );
}