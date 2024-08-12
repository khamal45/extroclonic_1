"use client";
import Image from "next/image";
import Link from "next/link";
import "./module.css";
import { signInWithGoogle } from "@libs/firebase/auth/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { log } from "console";
import RegisterLoginPage from "../component/login/page";

export default function Home() {
  const [isLogin, setLogin] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    setLogin((prev) => !prev);
  };
  useEffect(() => {
    const uid =
      typeof window !== "undefined" ? localStorage.getItem("uid") : null;
  });

  return (
    <main>
      <div className="header">
        <div className="logoWrapper">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
          <h2>EXTROCLONIC</h2>
        </div>

        <ul>
          <li className="button" onClick={handleLogin}>
            Login
          </li>
        </ul>
      </div>

      <div className="main">
        <div className="mainText">
          <h2>Welcome To</h2>
          <h1>EXTROCLONIC</h1>
          <p>
            Extroclonic merupakan sebuah Website Quiz yang menciptakan sebuah
            arti dengan menggabungkan nuansa Teknologi dan pendidikan
          </p>
        </div>
        <div className="mainImage">
          <img src="/imageKubus.png" alt="Oranmen" className="mainImg" />
        </div>
      </div>

      <div className="footer">
        <p>Copyright 2023. All Rights Reserved</p>
      </div>
      <RegisterLoginPage show={isLogin} onClose={handleLogin} />
    </main>
  );
}
