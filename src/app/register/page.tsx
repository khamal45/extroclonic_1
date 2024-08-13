"use client";
import {
  checkProfile,
  setProfile as firebaseSetProfile,
} from "@libs/firebase/service/database";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter dari next/router
import "./module.css";

export default function Register() {
  const router = useRouter(); // Inisialisasi useRouter

  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const uid =
      typeof window !== "undefined" ? localStorage.getItem("uid") : null;
    if (uid != null) {
      const checkAndNavigate = async () => {
        try {
          const uidExists = await checkProfile(uid); // Lakukan pengecekan uid
          if (uidExists) {
            // Jika uid ada di leaderboard, navigasi ke halaman /home
            router.push("/home");
          } else {
            // Jika uid tidak ada di leaderboard, lanjutkan dengan tampilan Register
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Error checking uid:", error);
          setIsLoading(false);
        }
      };
      checkAndNavigate();
    } else {
      setIsLoading(false);
    }
  }, []); // Pemanggilan useEffect hanya sekali saat komponen dimount

  const handleSubmit = async () => {
    try {
      const uid =
        typeof window !== "undefined" ? localStorage.getItem("uid") : null;
      if (uid != null) {
        await setProfile(uid, username);
        router.push("/home");
      } // Navigasi ke halaman /home setelah berhasil menyimpan profil
    } catch (error) {
      console.error("Error setting profile:", error);
      // Handle error accordingly
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Tampilkan indikator loading jika masih memproses
  }

  return (
    <form action={handleSubmit}>
      <div className="main1">
        Enter your username :{" "}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>{" "}
      </div>
    </form>
  );
}

async function setProfile(uid: string, username: string) {
  try {
    await firebaseSetProfile(uid, username); // Panggil fungsi dari Firebase untuk menyimpan profil
    console.log("Profile successfully set!");
  } catch (error) {
    console.error("Error setting profile:", error);
    throw error; // Dilempar untuk ditangani di komponen Register
  }
}
