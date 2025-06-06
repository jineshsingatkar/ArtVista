import React, { createContext, useState, useContext, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, role?: string) => Promise<boolean>;
  loginWithMobile: (mobile: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  signup: (name: string, email: string, password: string, role?: string, artistData?: any) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isArtist: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Mock user database
const mockUsers = [
  {
    id: "admin-1",
    email: "admin@admin.com",
    password: "Admin1234",
    name: "Admin User",
    isAdmin: true,
    isArtist: false,
    role: "admin",
    createdAt: new Date().toISOString(),
    profile: {
      address: "123 Admin Street",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400001",
      country: "India",
    },
    paymentDetails: {
      cardNumber: "4111111111111111",
      cardHolder: "Admin User",
      expiryDate: "12/25",
      cvv: "123",
    },
  },
  {
    id: "artist-1",
    email: "artist@artist.com",
    password: "Artist1234",
    name: "Demo Artist",
    isAdmin: false,
    isArtist: true,
    role: "artist",
    createdAt: new Date().toISOString(),
    artistData: {
      bio: "Welcome to my art gallery! I create unique pieces that blend traditional and modern techniques.",
      specialization: ["Painting", "Digital Art"],
      portfolio: [],
      joinedDate: new Date().toISOString(),
    },
    profile: {
      address: "456 Artist Lane",
      city: "Delhi",
      state: "Delhi",
      postalCode: "110001",
      country: "India",
    },
    paymentDetails: {
      cardNumber: "4111111111111111",
      cardHolder: "Demo Artist",
      expiryDate: "12/25",
      cvv: "123",
    },
  },
  {
    id: "user-1",
    email: "user@user.com",
    password: "User1234",
    name: "Demo User",
    isAdmin: false,
    isArtist: false,
    role: "user",
    createdAt: new Date().toISOString(),
    mobile: "1234567890",
    profile: {
      address: "789 User Road",
      city: "Bangalore",
      state: "Karnataka",
      postalCode: "560001",
      country: "India",
    },
    paymentDetails: {
      cardNumber: "4111111111111111",
      cardHolder: "Demo User",
      expiryDate: "12/25",
      cvv: "123",
    },
  },
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isArtist, setIsArtist] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAdmin(parsedUser.isAdmin);
      setIsArtist(parsedUser.isArtist);
    }
  }, []);

  const login = async (email: string, password: string, role?: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Validate input
      if (!email || !password) {
        toast({
          title: "Login Failed",
          description: "Please enter both email and password",
          variant: "destructive",
        });
        return false;
      }

      // Find user by email (case-insensitive)
      const foundUser = mockUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (!foundUser) {
        toast({
          title: "Login Failed",
          description: "No account found with this email address",
          variant: "destructive",
        });
        return false;
      }

      // Compare passwords
      if (foundUser.password !== password) {
        toast({
          title: "Login Failed",
          description: "Incorrect password",
          variant: "destructive",
        });
        return false;
      }

      // Check role if specified
      if (role && foundUser.role !== role) {
        toast({
          title: "Login Failed",
          description: `This account is not registered as a ${role}`,
          variant: "destructive",
        });
        return false;
      }

      // Remove password before storing
      const { password: _, ...userWithoutPassword } = foundUser;
      
      setUser(userWithoutPassword);
      setIsAdmin(foundUser.isAdmin);
      setIsArtist(foundUser.isArtist);
      
      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));

      toast({
        title: "Login Successful",
        description: `Welcome to ArtVista${foundUser.isArtist ? " as an Artist" : ""}!`,
      });
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithMobile = async (mobile: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const foundUser = mockUsers.find(
        (u) => u.mobile === mobile && u.password === password
      );

      if (!foundUser) {
        toast({
          title: "Login Failed",
          description: "Invalid mobile number or password",
          variant: "destructive",
        });
        return false;
      }

      // Remove password before storing
      const { password: _, ...userWithoutPassword } = foundUser;
      
      setUser(userWithoutPassword);
      setIsAdmin(foundUser.isAdmin);
      setIsArtist(foundUser.isArtist);
      
      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));

      toast({
        title: "Login Successful",
        description: `Welcome to ArtVista${foundUser.isArtist ? " as an Artist" : ""}!`,
      });
      return true;
    } catch (error) {
      console.error("Login error:", error);
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

  const loginWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // In a real app, this would handle Google OAuth
      // For now, we'll just simulate a successful login with a mock user
      const mockGoogleUser = {
        id: "google-1",
        email: "google@example.com",
        name: "Google User",
        isAdmin: false,
        isArtist: false,
        role: "user",
        createdAt: new Date().toISOString(),
      };
      
      setUser(mockGoogleUser);
      setIsAdmin(false);
      setIsArtist(false);
      
      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(mockGoogleUser));

      toast({
        title: "Login Successful",
        description: "Welcome to ArtVista!",
      });
      return true;
    } catch (error) {
      console.error("Google login error:", error);
      toast({
        title: "Login Failed",
        description: "An error occurred during Google login",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    role?: string,
    artistData?: any
  ): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Check if email already exists
      if (mockUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        toast({
          title: "Signup Failed",
          description: "This email is already registered",
          variant: "destructive",
        });
        return false;
      }

      const newUser = {
        id: `user-${mockUsers.length + 1}`,
        name,
        email,
        password,
        isAdmin: false,
        isArtist: role === "artist",
        role: role || "user",
        createdAt: new Date().toISOString(),
        ...(role === "artist" && artistData ? { artistData } : {}),
      };

      // In a real app, you would store this in a database
      mockUsers.push(newUser);

      // Remove password before storing
      const { password: _, ...userWithoutPassword } = newUser;
      
      setUser(userWithoutPassword);
      setIsArtist(role === "artist");
      
      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));

      toast({
        title: "Account Created",
        description: `Welcome to ArtVista${role === "artist" ? " as an Artist" : " as an Art Lover"}!`,
      });
      return true;
    } catch (error) {
      console.error("Signup error:", error);
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
    setIsAdmin(false);
    setIsArtist(false);
    localStorage.removeItem("user");
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
        loginWithMobile,
        loginWithGoogle,
        signup,
        logout,
        isAuthenticated: !!user,
        isAdmin,
        isArtist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
