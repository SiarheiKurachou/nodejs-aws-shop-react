import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { useAuth } from "react-oidc-context";

export default function PageLogin() {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/");
    }
  }, [auth.isAuthenticated, navigate]);

  if (auth.isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%" }}>
        <CardContent sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Welcome to Shop
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
            Sign in with AWS Cognito to continue
          </Typography>

          {auth.error && (
            <Box
              sx={{
                mb: 2,
                p: 2,
                bgcolor: "#ffebee",
                color: "#c62828",
                borderRadius: 1,
              }}
            >
              <Typography variant="body2">{auth.error.message}</Typography>
            </Box>
          )}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => auth.signinRedirect()}
            sx={{ py: 1.5 }}
          >
            Sign In with Cognito
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
