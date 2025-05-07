import React from "react";
import Health from "./health";

interface ModalProps {
  show: boolean;
  message: string;
  score: string;
  health: number;
}

const Modal: React.FC<ModalProps> = ({ show, message, score, health }) => {
  // Pastikan modal tetap muncul jika health < 1
  if (!show && health >= 1) {
    return null;
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {health >= 1 ? (
          <>
            <Health health={health} />
            <p>{message}</p>
          </>
        ) : (
          <>
            <h1>Game Over</h1>
            <p>your score</p>
            <h2>{score}</h2>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed" as "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "black",
    padding: "20px",
    borderRadius: "5px",
    textAlign: "center" as "center",
  },
};

export default Modal;
