import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

// Create the authentication context
const AuthContext = createContext(null);

// Auth Provider component
export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    //register a user
    const registerUser = async (email,password) => {
        try {
            console.log("Registering user with email:", email);
            const result = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User registered successfully:", result.user.email);
            return result;
        } catch (error) {
            console.error("Registration error:", error.code, error.message);
            throw error;
        }
    };
    
    //login the user
    const loginUser = async (email, password) => {
        try {
            console.log("Attempting login with email:", email);
            const result = await signInWithEmailAndPassword(auth, email, password);
            console.log("Login successful, user:", result.user.email);
            
            // Store the token in localStorage
            const token = await result.user.getIdToken();
            localStorage.setItem('token', token);
            return result;
        } catch (error) {
            console.error("Login error:", error.code, error.message);
            throw error;
        }
    };

    //sign up with google
    const signInWithGoogle = async () => {
        try {
            const googleProvider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, googleProvider);
            // Store the token in localStorage
            const token = await result.user.getIdToken();
            localStorage.setItem('token', token);
            return result;
        } catch (error) {
            console.error("Google sign in error:", error.code, error.message);
            throw error;
        }
    };
    
    //reset password
    const resetPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            return { success: true };
        } catch (error) {
            console.error("Password reset error:", error.code, error.message);
            throw error;
        }
    };

    // logout the user
    const logout = async () => {
        try {
            await signOut(auth);
            // Clear token from localStorage
            localStorage.removeItem('token');
        } catch (error) {
            console.error("Logout error:", error);
            throw error;
        }
    };

    // manage user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const value = {
        currentUser,
        loading,
        registerUser,
        loginUser,
        signInWithGoogle,
        resetPassword,
        logout
    };
    
    return (
        <AuthContext.Provider value={value}>
           {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}