import React, { createContext, useState, useCallback, useEffect } from "react";
import { getIdToken, getAccessToken, clearTokens, isTokenExpired } from "~/utils/cognito";

export interface AuthContextType {
  isAuthenticated: boolean;
  idToken: string | null;
  accessToken: string | null;
  login: (tokens: { access_token: string; id_token: string; refresh_token?: string }) => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if tokens exist and are valid on mount
    const storedIdToken = getIdToken();
    const storedAccessToken = getAccessToken();

    if (storedIdToken && storedAccessToken) {
      if (!isTokenExpired(storedIdToken)) {
        setIdToken(storedIdToken);
        setAccessToken(storedAccessToken);
        setIsAuthenticated(true);
      } else {
        // Tokens expired, clear them
        clearTokens();
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(
    (tokens: { access_token: string; id_token: string; refresh_token?: string }) => {
      setIdToken(tokens.id_token);
      setAccessToken(tokens.access_token);
      setIsAuthenticated(true);
    },
    []
  );

  const logout = useCallback(() => {
    clearTokens();
    setIdToken(null);
    setAccessToken(null);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, idToken, accessToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
