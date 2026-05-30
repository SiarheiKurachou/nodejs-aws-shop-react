// Token helper utilities
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

export const getIdToken = (auth: any): string | null => {
  return auth?.id_token || null;
};

export const getAccessToken = (auth: any): string | null => {
  return auth?.access_token || null;
};
