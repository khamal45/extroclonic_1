"use client";

import React, { useState } from "react";
import "./module.css";
import {
  signInWithGoogle,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@libs/firebase/auth/auth"; // Adjust this path according to your project structure
import GoogleButton from "react-google-button";
import { useRouter } from "next/navigation";

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

const RegisterLoginPage: React.FC<ModalProps> = ({ show, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const user = await createUserWithEmailAndPassword(email, password);
      if (user) {
        router.push("/register");
      }
      setErrorMessage(""); // Clear error message on successful registration
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage("Registration failed. Please try again.");
    }
  };
  const handleLoginGoogle = async () => {
    const user = await signInWithGoogle();
    if (user) {
      router.push("/register");
    }
  };

  const handleLogin = async () => {
    try {
      const user = await signInWithEmailAndPassword(email, password);
      console.log("Logged in user:", user);
      if (user) {
        router.push("/register");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(
        "Login failed. Please check your credentials and try again."
      );
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="parent" onClick={(e) => e.stopPropagation()}>
        <h2>{isRegistering ? "Register" : "Login"}</h2>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isRegistering) {
              handleRegister();
            } else {
              handleLogin();
            }
          }}
        >
          <div className="wraper">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="wraper">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {isRegistering && (
            <div className="wraper">
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          <button className="buttonLogin" type="submit">
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>
        <GoogleButton onClick={handleLoginGoogle} />
        <button
          onClick={() => {
            setIsRegistering(!isRegistering);
            setErrorMessage(""); // Clear error message when switching modes
          }}
        >
          {isRegistering ? "Already Have Account" : "Don't have an account"}
        </button>
      </div>
    </div>
  );
};

export default RegisterLoginPage;
