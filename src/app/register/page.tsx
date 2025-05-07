"use client";
import {
  checkProfile,
  setProfile as firebaseSetProfile,
} from "@libs/firebase/service/database";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getCookie } from "@libs/cookies/use-cookie";

export default function Register() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const checkAndNavigate = async () => {
      const uid = await getCookie("uid");
      if (uid) {
        try {
          const uidExists = await checkProfile(uid);
          if (uidExists) {
            router.push("/home");
          } else {
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Error checking uid:", error);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    checkAndNavigate();
  }, []);

  const handleSubmit = async () => {
    const uid = await getCookie("uid");
    try {
      if (uid != null) {
        await setProfile(uid, username);
        router.push("/home");
      }
    } catch (error) {
      console.error("Error setting profile:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form
      style={{
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        margin: "100px",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <label htmlFor="username">Enter your username :</label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

async function setProfile(uid: string, username: string) {
  try {
    await firebaseSetProfile(uid, username);
  } catch (error) {
    console.error("Error setting profile:", error);
    throw error;
  }
}
