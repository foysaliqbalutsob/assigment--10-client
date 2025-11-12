import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUserWithEmailAndPasswordFunc = (email, password) => {
    
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInWithEmailAndPasswordFun = (email, password) => {
     
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGooglePopupFun = (googleProvider) => {
    
    return signInWithPopup(auth, googleProvider);
  };

  const signInWithGithubPopupFun = (githubProvider) => {
    
    return signInWithPopup(auth, githubProvider);
  };
  const signOutFunc = () => {
   
    return signOut(auth);
  };

  const sendPasswordResetEmailFunc = (email) => {
    
    return sendPasswordResetEmail(auth, email);
  };
  const updateProfileFunc = (displayName, photoURL) => {
    
     
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log( currentUser);
      setUser(currentUser);
      // console.log(currentUser)
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    createUserWithEmailAndPasswordFunc,
    signInWithEmailAndPasswordFun,
    signInWithGooglePopupFun,
    signInWithGithubPopupFun,
    signOutFunc,
    sendPasswordResetEmailFunc,
    updateProfileFunc,
    loading, setLoading,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
