import { cognitoConfig } from "~/constants/cognitoConfig";

const COGNITO_DOMAIN = `https://cognito-idp.${cognitoConfig.region}.amazonaws.com`;

export const getCognitoLoginUrl = () => {
  const redirectUri = `${window.location.origin}/login/callback`;
  const params = new URLSearchParams({
    client_id: cognitoConfig.clientId,
    response_type: "code",
    scope: "openid profile email",
    redirect_uri: redirectUri,
  });

  return `${COGNITO_DOMAIN}/${cognitoConfig.userPoolId}/oauth2/authorize?${params.toString()}`;
};

export const exchangeCodeForTokens = async (code: string) => {
  const redirectUri = `${window.location.origin}/login/callback`;

  const response = await fetch(
    `${COGNITO_DOMAIN}/${cognitoConfig.userPoolId}/oauth2/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: cognitoConfig.clientId,
        code,
        redirect_uri: redirectUri,
      }).toString(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to exchange code for tokens");
  }

  return response.json();
};

export const decodeToken = (token: string) => {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid token");
  }

  const decoded = JSON.parse(
    atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))
  );
  return decoded;
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = decodeToken(token);
    const expirationTime = decoded.exp * 1000;
    return Date.now() >= expirationTime;
  } catch {
    return true;
  }
};

export const storeTokens = (tokens: {
  access_token: string;
  id_token: string;
  refresh_token?: string;
}) => {
  localStorage.setItem("access_token", tokens.access_token);
  localStorage.setItem("id_token", tokens.id_token);
  if (tokens.refresh_token) {
    localStorage.setItem("refresh_token", tokens.refresh_token);
  }
};

export const getIdToken = (): string | null => {
  return localStorage.getItem("id_token");
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem("access_token");
};

export const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("id_token");
  localStorage.removeItem("refresh_token");
};
