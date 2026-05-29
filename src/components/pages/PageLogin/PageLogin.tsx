import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Button, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { useAuth } from "~/contexts/AuthContext";
import { getCognitoLoginUrl, exchangeCodeForTokens, storeTokens } from "~/utils/cognito";

export default function PageLogin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, isAuthenticated, loading } = useAuth();
  const [error, setError] = React.useState<string | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate("/");
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      handleCallback(code);
    }
  }, [searchParams]);

  const handleCallback = async (code: string) => {
    setIsProcessing(true);
    try {
      const tokens = await exchangeCodeForTokens(code);
      storeTokens(tokens);
      login(tokens);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to authenticate");
      setIsProcessing(false);
    }
  };

  const handleLogin = () => {
    window.location.href = getCognitoLoginUrl();
  };

  if (loading || isProcessing) {
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

          {error && (
            <Box
              sx={{
                mb: 2,
                p: 2,
                bgcolor: "#ffebee",
                color: "#c62828",
                borderRadius: 1,
              }}
            >
              <Typography variant="body2">{error}</Typography>
            </Box>
          )}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            sx={{ py: 1.5 }}
          >
            Sign In with Cognito
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
