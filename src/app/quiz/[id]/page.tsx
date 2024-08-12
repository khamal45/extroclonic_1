"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Timer from "./timer";
import Health from "./health";
import Modal from "./modal";
import { getProfile, setLeaderboard } from "@libs/firebase/service/database";
import { useRouter } from "next/navigation";
import "./module.css";

export default function Quiz({ params }: { params: { id: string } }) {
  type Result = {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  };
  const uid = localStorage.getItem("uid");
  const he = require("he");
  const [data, setData] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
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
    try {
      const apiLink = `https://opentdb.com/api.php?amount=10&category=${params.id}&difficulty=easy&type=multiple`;
      const response = await axios.get(apiLink);
      setData(response.data.results);
      console.log(response.data.results.length);
      if (response.data.results.length === 0) {
        router.replace("/quiz/12");
      } else {
        setLoading(false);
        setCurrentQuestionIndex(0);
      }
      // Reset question index when new data is fetched
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (a === 0) {
      fetchQuizData();
      a++;
    }
  }, [params.id]);

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
    if (uid != null) {
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
      fetchQuizData(); // Fetch new questions when the current set is exhausted
    }
  };

  const handleAnswerSelection = (answer: string) => {
    const isCorrect = answer === data[currentQuestionIndex].correct_answer;
    setModalMessage(isCorrect ? "Correct!" : "Incorrect!");
    setShowModal(true);

    if (isCorrect) {
      setPoints((prevPoints) => prevPoints + 1);
    } else {
      if (health <= 1) {
        gameOver();
      } else {
        setHealth((prevHealth) => prevHealth - 1);
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
          <Modal show={showModal} message={modalMessage} />
        </div>
      )}
    </main>
  );
}
