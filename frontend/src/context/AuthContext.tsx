import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context's value
interface AuthContextType {
  // For now, we only care about the token for the FAQ component.
  // We will add user objects, anonymous IDs, and status later.
  token: string | null;
  // Dummy functions to satisfy future components
  login: (token: string) => void;
  logout: () => void;
}

// Create the context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // For this placeholder, the user is always anonymous, so the token is always null.
  const [token, setToken] = useState<string | null>(null);

  // Define dummy login/logout functions for now.
  const login = (newToken: string) => {
    console.log("Login function called (not implemented)");
    setToken(newToken); // In a real scenario, you'd do more here.
  };

  const logout = () => {
    console.log("Logout function called (not implemented)");
    setToken(null); // In a real scenario, you'd do more here.
  };

  // The value provided to consuming components
  const value = { token, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Create the custom hook for using the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // This check is what makes the app crash without a provider
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
