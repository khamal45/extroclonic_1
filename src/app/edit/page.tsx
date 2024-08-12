"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getProfile,
  setProfile,
  deleteProfile,
  deleteLeaderboard,
} from "@libs/firebase/service/database";
import "./module.css";
import { signOutWithGoogle } from "@libs/firebase/auth/auth";

type ModalProps = {
  show: boolean;
  onClose: () => void;
};

export default function Edit({ show, onClose }: ModalProps) {
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isChangeUsername, setIsChangeUsername] = useState(false); // State untuk menangani mode editing
  const uid = localStorage.getItem("uid");
  const router = useRouter();

  useEffect(() => {
    const getUsername = async () => {
      if (uid != null) {
        try {
          const userProfile = await getProfile(uid);
          if (userProfile) {
            setUsername(userProfile.username);
          } else {
            setUsername("");
          }
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching profile:", error);
          setIsLoading(false);
        }
      }
    };

    getUsername();
  }, [uid]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(e.target.value);
  };

  const handleEditUsername = () => {
    setIsChangeUsername(!isChangeUsername); // Aktifkan mode editing saat tombol "Change username" ditekan
  };

  const handleSubmit = async () => {
    try {
      if (uid != null) {
        await setProfile(uid, newUsername);
        setUsername(newUsername);
        setIsChangeUsername(false); // Nonaktifkan mode editing setelah submit berhasil
        console.log("Username updated successfully!");
      }
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  const handleDeleteProfile = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your profile? This action cannot be undone."
    );
    if (confirmDelete) {
      try {
        if (uid != null) {
          await deleteProfile(uid);
          console.log("Profile deleted successfully!");
          setUsername("");
          router.push("/");
        }
      } catch (error) {
        console.error("Error deleting profile:", error);
      }
    }
  };

  const handleDeleteLeaderboard = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your leaderboard? This action cannot be undone."
    );
    if (confirmDelete) {
      try {
        if (uid != null) {
          await deleteLeaderboard(uid);
          console.log("Leaderboard deleted successfully!");
        }
      } catch (error) {
        console.error("Error deleting leaderboard:", error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOutWithGoogle();
      localStorage.removeItem("uid"); // Remove UID from localStorage
      router.push("/"); // Redirect to the home page or any other page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!show) {
    return <main />;
  }

  return (
    <main className="overlay" onClick={onClose}>
      <div className="edit" onClick={(e) => e.stopPropagation()}>
        {username && <div>{username}</div>}
        <button onClick={handleEditUsername}>Change username</button>
        {isChangeUsername && (
          <>
            New Username
            <input
              type="text"
              value={newUsername}
              onChange={handleInputChange}
            />
            <button onClick={handleSubmit}>Save</button>
          </>
        )}
        <button onClick={handleDeleteLeaderboard}>Delete Leaderboard</button>
        <button onClick={handleDeleteProfile}>Delete Profile</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </main>
  );
}
