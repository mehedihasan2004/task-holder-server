import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import { auth } from "../Firebase/firebase.config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const signUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo);
  };

  const googleLogin = async () => {
    return signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((err) => console.log("Error", err));
  };

  const logout = async () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {})
      .catch(() => {});
  };

  useEffect(() => {
    const unmount = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unmount();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        setError,
        signUp,
        login,
        logout,
        updateUser,
        googleLogin,
        editModal,
        deleteModal,
        setEditModal,
        setDeleteModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
