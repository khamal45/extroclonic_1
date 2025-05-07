"use client";

import Image from "next/image";
import Link from "next/link";
import "./module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { getProfile } from "@libs/firebase/service/database";
import Edit from "../edit/page";
import Leaderboard from "../leaderboard/page";
import { getCookie } from "@libs/cookies/use-cookie";

interface Category {
  id: number;
  name: string;
}

interface homeProps {
  category: Category[];
  username: string;
}
export default function ClientPage(props: homeProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const handleOpenLeaderboard = () => {
    setShowLeaderboard(true);
  };

  const handleCloseLeaderboard = () => {
    setShowLeaderboard(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  let a = 0;

  if (loading) {
    return <main>Loading....</main>;
  }

  return (
    <main>
      <div className="header">
        <div className="logoWrapper">
          <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
          <h2>EXTROCLONIC</h2>
        </div>

        <li>
          <ul>
            <li className="active">{props.username}</li>

            <li style={{ cursor: "pointer" }} onClick={handleOpenLeaderboard}>
              Leaderboard
            </li>

            <li className="button" onClick={handleOpenModal}>
              Setting
            </li>
          </ul>
        </li>
      </div>
      <div className="main">
        <div className="mainText">
          <h2>Welcome To</h2>
          <h1>EXTROCLONIC</h1>
          <p>
            Extroclonic merupakan sebuah Website Quiz yang menciptakan sebuah
            arti dengan menggabungkan nuansa Teknologi dan pendidikan
          </p>
          <Link
            key={props.category[0].id}
            href={`/quiz/${props.category[0].id}`}
          >
            <div className="category-button" style={{ width: "50%" }}>
              Mulai
            </div>
          </Link>
        </div>
        <div className="mainImage">
          <Image
            src="/images/imageKubus.png"
            alt="Oranmen"
            className="mainImg"
            width={400}
            height={400}
          />
        </div>
      </div>
      <div className="Container">
        <h1>Kategori Topik Pembahasan</h1>
        <div className="menu">
          {props.category.map((category) => (
            <Link key={category.id} href={`/quiz/${category.id}`}>
              <div className="category-button">{category.name}</div>
            </Link>
          ))}
        </div>
      </div>
      <Edit show={showModal} onClose={handleCloseModal} />
      <Leaderboard show={showLeaderboard} onClose={handleCloseLeaderboard} />
      <div className="footer">
        <p>Copyright 2023. All Rights Reserved</p>
      </div>
    </main>
  );
}
