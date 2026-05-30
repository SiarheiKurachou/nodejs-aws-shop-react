import React from "react";
import { AuthProvider as OidcAuthProvider } from "react-oidc-context";
import { cognitoConfig } from "~/constants/cognitoConfig";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <OidcAuthProvider {...cognitoConfig}>
      {children}
    </OidcAuthProvider>
  );
};

// Re-export useAuth hook from react-oidc-context
export { useAuth } from "react-oidc-context";
