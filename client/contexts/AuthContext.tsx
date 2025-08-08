import React, { createContext, useContext, useState, useEffect } from "react";
import { SessionManager } from "@/utils/sessionManager";

export type UserRole =
  | "super-admin"
  | "admin"
  | "institution"
  | "principal"
  | "hod"
  | "faculty"
  | "staff"
  | "student"
  | "parent";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  instituteId?: string;
  programId?: string;
  loginTime?: string;
  sessionId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: User[] = [
  {
    id: "1",
    name: "Manikandan",
    email: "superadmin@gmail.com",
    role: "super-admin",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "2",
    name: "Madhan Kumar",
    email: "admin@gmail.com",
    role: "admin",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "3",
    name: "Praveen",
    email: "institution@gmail.com",
    role: "institution",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "4",
    name: "Gobi",
    email: "principal@gmail.com",
    role: "principal",
    avatar:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "5",
    name: "Karthick",
    email: "hod@gmail.com",
    role: "hod",
    avatar:
      "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "6",
    name: "Madhan",
    email: "faculty@gmail.com",
    role: "faculty",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "7",
    name: "christy",
    email: "staff@gmail.com",
    role: "staff",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b332c1ad?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "8",
    name: "Devaiyani",
    email: "student@gmail.com",
    role: "student",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "9",
    name: "Murugan",
    email: "parent@gmail.com",
    role: "parent",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user session exists and is valid
    const sessionData = SessionManager.getSession();
    if (sessionData && SessionManager.isValidSession()) {
      setUser(sessionData.user);
      console.log("Valid session restored for user:", sessionData.user.email);
    } else {
      console.log("No valid session found");
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const foundUser = mockUsers.find((u) => u.email === email);
    if (foundUser) {
      // Create enhanced user object with session data
      const userWithSession: User = {
        ...foundUser,
        loginTime: new Date().toISOString(),
        sessionId: SessionManager.generateSessionId(),
      };

      setUser(userWithSession);

      // Use SessionManager to store session data
      SessionManager.storeSession(userWithSession);

      console.log("User logged in successfully:", {
        email: userWithSession.email,
        role: userWithSession.role,
        sessionId: userWithSession.sessionId,
      });

      return true;
    }
    return false;
  };

  const logout = () => {
    console.log("User logged out");

    // Clear user state
    setUser(null);

    // Use SessionManager to clear all session data
    SessionManager.clearAllSessionData();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Utility function to check if session is still valid
export const isSessionValid = (): boolean => {
  return SessionManager.isValidSession();
};

// Utility function to get current session info
export const getSessionInfo = () => {
  return SessionManager.getSessionInfo();
};
