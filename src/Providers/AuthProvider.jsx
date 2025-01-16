import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firebase.config";
import axios from "axios";
import UsePublic from "../Hooks/UsePublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = UsePublic();

    // **Authentication Functions**
    const handleRegister = (email, password) =>
        createUserWithEmailAndPassword(auth, email, password);

    const signIn = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    const signInWithGoogle = () =>
        signInWithPopup(auth, new GoogleAuthProvider());

    const logOut = async () => {
        localStorage.removeItem("token");
        return signOut(auth);
    };

    const updateUserProfile = (name, photo) =>
        updateProfile(auth.currentUser, { displayName: name, photoURL: photo });

    // **Handle JWT and User State**
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true);
            if (currentUser?.email) {
                try {
                    const { data } = await axiosPublic.post("/jwt", { email: currentUser.email });
                    if (data.token) {
                        localStorage.setItem("token", data.token);
                    }
                    setUser(currentUser);
                } catch (error) {
                    console.error("Error fetching token:", error);
                }
            } else {
                localStorage.removeItem("token");
                setUser(null);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, [axiosPublic]);

    // **Context Value**
    const authInfo = {
        user,
        loading,
        handleRegister,
        signIn,
        signInWithGoogle,
        logOut,
        updateUserProfile,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
