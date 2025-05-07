"use client";

import { getLeaderboard } from "@libs/firebase/service/database";
import { useEffect, useState } from "react";
import "./module.css";

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

export default function Leaderboard({ show, onClose }: ModalProps) {
  interface Data {
    uid: string;
    score: string;
    username: string;
  }

  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    const getData = async () => {
      const leaderboardData = await getLeaderboard();
      setData(leaderboardData);
    };
    getData();
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <main className="overlay" onClick={onClose}>
      <div className="leaderboard" onClick={(e) => e.stopPropagation()}>
        <h1>Leaderboard</h1>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr key={entry.uid}>
                <td>{entry.username}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
