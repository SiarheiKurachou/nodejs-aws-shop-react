const requireEnv = (name: keyof ImportMetaEnv): string => {
  const value = import.meta.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

export const cognitoConfig = {
  authority: requireEnv("VITE_COGNITO_AUTHORITY"),
  client_id: requireEnv("VITE_COGNITO_CLIENT_ID"),
  redirect_uri: requireEnv("VITE_COGNITO_REDIRECT_URI"),
  response_type: "code",
  scope: requireEnv("VITE_COGNITO_SCOPE"),
};
