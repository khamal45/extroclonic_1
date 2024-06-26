"use client";

import Image from "next/image";
import Link from "next/link";
import "./module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { getProfile } from "@libs/firebase/service/database";
import Edit from "../edit/page";
import Leaderboard from "../leaderboard/page";

export default function Home() {
  interface Category {
    id: number;
    name: string;
  }
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
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
  const uid = localStorage.getItem("uid");
  useEffect(() => {
    const getUsername = async () => {
      if (uid != null) {
        const username = await getProfile(uid);
        setUsername(username.username);
      }
    };
    const fetchCategories = async () => {
      try {
        await getUsername();
        const response = await axios.get(
          "https://opentdb.com/api_category.php"
        );
        setCategories(response.data.trivia_categories);

        setLoading(false);
      } catch (exception: any) {
        console.log(exception);
      }
    };

    if (a == 0) {
      a++;
      fetchCategories();
    }
  }, []);

  if (loading) {
    return <main>Loading....</main>;
  }

  return (
    <main>
      <div className="header">
        <div className="logoWrapper">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
          <h2>EXTROCLONIC</h2>
        </div>

        <li>
          <ul>
            <li className="active">{username}</li>

            <li onClick={handleOpenLeaderboard}>Leaderboard</li>

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
        </div>
        <div className="mainImage">
          <img src="/imageKubus.png" alt="Oranmen" className="mainImg" />
        </div>
      </div>
      <div className="Container">
        <h1>Kategori Topik Pembahasan</h1>
        <div className="menu">
          {categories.map((category) => (
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
