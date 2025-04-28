
import React, { createContext, useState, useContext, useEffect } from "react";
import { User } from "@/types";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("artvista-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // This is a mock implementation - would be replaced with actual API call
      if (email === "admin@artvista.com" && password === "admin123") {
        const adminUser: User = {
          id: "admin-1",
          email: "admin@artvista.com",
          name: "Admin User",
          isAdmin: true,
        };
        setUser(adminUser);
        localStorage.setItem("artvista-user", JSON.stringify(adminUser));
        toast({
          title: "Logged in as Admin",
          description: "Welcome back to the admin panel",
        });
        return true;
      } else if (email && password) {
        // Mock regular user login
        const regularUser: User = {
          id: `user-${Math.random().toString(36).substr(2, 9)}`,
          email: email,
          name: email.split("@")[0],
          isAdmin: false,
        };
        setUser(regularUser);
        localStorage.setItem("artvista-user", JSON.stringify(regularUser));
        toast({
          title: "Login Successful",
          description: "Welcome to ArtVista!",
        });
        return true;
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "An error occurred during login",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Mock signup - would be replaced with actual API call
      if (email && password && name) {
        const newUser: User = {
          id: `user-${Math.random().toString(36).substr(2, 9)}`,
          email: email,
          name: name,
          isAdmin: false,
        };
        setUser(newUser);
        localStorage.setItem("artvista-user", JSON.stringify(newUser));
        toast({
          title: "Account Created",
          description: "Welcome to ArtVista!",
        });
        return true;
      } else {
        toast({
          title: "Signup Failed",
          description: "Please fill all required fields",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: "An error occurred during signup",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("artvista-user");
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
