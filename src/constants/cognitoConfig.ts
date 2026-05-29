export const cognitoConfig = {
  authority: "https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_y4FtUaQJO",
  clientId: "4tt9mj80v9rp9oivhjkrk6g7dh",
  redirectUri: `${window.location.origin}/login/callback`,
  responseType: "code",
  scope: "openid profile email",
};
