"use client";

import {
  type User,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  getAuth,
  createUserWithEmailAndPassword as _createUserWithEmailAndPassword,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
} from "firebase/auth";

import firebase_app from "../config";
import { deleteCookie, setCookie } from "../../cookies/use-cookie";

const auth = getAuth(firebase_app);

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
  return _onAuthStateChanged(auth, callback);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);

    if (!result || !result.user) {
      return false;
    }

    await setCookie("uid", result.user.uid);
    return true;
  } catch (error) {
    return false;
  }
}

export async function signOutWithGoogle() {
  try {
    await auth.signOut();
    deleteCookie("uid");
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}

export async function createUserWithEmailAndPassword(
  email: string,
  password: string
) {
  try {
    const userCredential = await _createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    setCookie("uid", user.uid);
    return true;
  } catch (error) {
    console.error("Error creating user with email and password", error);
    throw error;
    return false;
  }
}

export async function signInWithEmailAndPassword(
  email: string,
  password: string
) {
  try {
    const userCredential = await _signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    setCookie("uid", user.uid);
    return true;
  } catch (error) {
    console.error("Error signing in with email and password", error);
    throw error;
    return false;
  }
}
