export const cognitoConfig = {
  authority: "https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_y4FtUaQJO",
  client_id: "4tt9mj80v9rp9oivhjkrk6g7dh",
  redirect_uri: `${window.location.origin}/login/callback`,
  response_type: "code",
  scope: "openid profile email",
};
