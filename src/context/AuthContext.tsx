import React, { createContext, useState, useContext, useEffect } from "react";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "@/lib/firebase";
import { User } from "@/types";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, role?: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, role?: string, artistData?: any) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isArtist: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isArtist, setIsArtist] = useState<boolean>(false);
  const { toast } = useToast();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email || "",
            name: userData.name,
            isAdmin: userData.isAdmin || false,
            isArtist: userData.isArtist || false,
            artistData: userData.artistData || null,
          });
          setIsAdmin(userData.isAdmin || false);
          setIsArtist(userData.isArtist || false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
        setIsArtist(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [auth, db]);

  const login = async (email: string, password: string, role?: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Special case for admin login
      if (email === "admin@admin.com" && password === "123456") {
        const adminUser = {
          id: "admin-1",
          email: "admin@admin.com",
          name: "Admin User",
          isAdmin: true,
          isArtist: false,
        };
        setUser(adminUser);
        setIsAdmin(true);
        setIsArtist(false);
        toast({
          title: "Admin Login Successful",
          description: "Welcome to the admin panel",
        });
        return true;
      }

      // Special case for artist login
      if (email === "Artist@Artist.com" && password === "123456") {
        const artistUser = {
          id: "artist-1",
          email: "Artist@Artist.com",
          name: "Demo Artist",
          isAdmin: false,
          isArtist: true,
          artistData: {
            bio: "Welcome to my art gallery! I create unique pieces that blend traditional and modern techniques.",
            specialization: ["Painting", "Digital Art"],
            portfolio: [],
            joinedDate: new Date(),
          },
        };
        setUser(artistUser);
        setIsAdmin(false);
        setIsArtist(true);
        toast({
          title: "Artist Login Successful",
          description: "Welcome to your artist dashboard",
        });
        return true;
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        // Check if the user is trying to login as an artist but is not an artist
        if (role === "artist" && !userData.isArtist) {
          toast({
            title: "Login Failed",
            description: "This account is not registered as an artist",
            variant: "destructive",
          });
          return false;
        }
        
        // Check if the user is trying to login as a regular user but is an artist
        if (role === "user" && userData.isArtist) {
          toast({
            title: "Login Failed",
            description: "This account is registered as an artist. Please login as an artist.",
            variant: "destructive",
          });
          return false;
        }
      }

      toast({
        title: "Login Successful",
        description: "Welcome to ArtVista!",
      });
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;
      
      const userData = {
        name,
        email,
        isAdmin: false,
        isArtist: role === "artist",
        createdAt: new Date(),
      };

      if (role === "artist" && artistData) {
        userData.artistData = artistData;
      }
      
      await setDoc(doc(db, "users", newUser.uid), userData);
      
      toast({
        title: "Account Created",
        description: `Welcome to ArtVista${role === "artist" ? " as an Artist" : ""}!`,
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

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAdmin(false);
      setIsArtist(false);
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout Failed",
        description: "An error occurred during logout",
        variant: "destructive",
      });
    }
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
        isAdmin,
        isArtist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
