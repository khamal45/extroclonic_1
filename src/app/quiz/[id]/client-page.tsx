"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Timer from "./timer";
import Health from "./health";
import Modal from "./modal";
import { getProfile, setLeaderboard } from "@libs/firebase/service/database";
import { useRouter } from "next/navigation";
import "./module.css";
import { getQuiz } from "@libs/api/get-quiz";
import { getCookie } from "@libs/cookies/use-cookie";
import GameOver from "./game-over";
interface Quiz {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

type quizProps = Quiz[];

export default function ClientPage({
  quiz,
  id,
}: {
  quiz: quizProps;
  id: string;
}) {
  const he = require("he");
  const [data, setData] = useState<Quiz[]>(quiz);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [health, setHealth] = useState(3);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showTimer, setShowTimer] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [points, setPoints] = useState(0);

  let a = 0;
  const router = useRouter();
  const fetchQuizData = async () => {
    setLoading(true);
    const response = await getQuiz(id);
    setData(response.results);
    setLoading(false);
  };

  useEffect(() => {
    setShowTimer(true);
    if (!loading && currentQuestionIndex < data.length) {
      const timerTimeout = setTimeout(() => {
        setShowTimer(false);
        handleNextQuestion();
        if (health <= 1) {
          gameOver();
        } else {
          setHealth((prevHealth) => prevHealth - 1);
        }
      }, 30000);
      return () => clearTimeout(timerTimeout);
    }
  }, [currentQuestionIndex, loading]);

  const gameOver = async () => {
    const uid = await getCookie("uid");
    if (uid) {
      const username = await getProfile(uid);
      setLeaderboard(uid, username.username, points.toString());
      router.refresh();
      router.replace("/home");
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < data.length - 1) {
      setShowTimer(false);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
    } else {
      fetchQuizData();
    }
  };

  const handleAnswerSelection = (answer: string) => {
    const isCorrect = answer === data[currentQuestionIndex].correct_answer;
    setModalMessage(isCorrect ? "Correct!" : "Incorrect!");
    setShowModal(true);

    if (isCorrect) {
      setPoints((prevPoints) => prevPoints + 1);
    } else {
      setHealth((prevHealth) => prevHealth - 1);
      if (health <= 1) {
        gameOver();
      }
    }

    setTimeout(() => {
      setShowModal(false);
      handleNextQuestion();
    }, 1000);
  };

  return (
    <main>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <div>
          <div className="headerQuestion">
            <div>
              <div className="health">
                <Health health={health} />
              </div>

              <div className="point">Your point is {points}</div>
            </div>

            <div className="timer">{showTimer && <Timer />}</div>
          </div>
          <div className="mainQuestion">
            <div className="question" key={currentQuestionIndex}>
              <h2>{he.decode(data[currentQuestionIndex].question)}</h2>
            </div>
          </div>
          <div className="mainAnswer">
            {[
              ...data[currentQuestionIndex].incorrect_answers,
              data[currentQuestionIndex].correct_answer,
            ]
              .sort(() => Math.random() - 0.5)
              .map((answer, index) => (
                <div
                  key={index}
                  onClick={() => handleAnswerSelection(he.decode(answer))}
                  className={`answer ${index === 0 ? "option-blue" : ""} ${
                    index === 1 ? "option-yellow" : ""
                  } ${index === 2 ? "option-green" : ""} ${
                    index === 3 ? "option-red" : ""
                  }`}
                >
                  {he.decode(answer)}
                </div>
              ))}
          </div>
          <Modal
            show={showModal}
            message={modalMessage}
            score={points.toString()}
            health={health}
          />
        </div>
      )}
    </main>
  );
}
