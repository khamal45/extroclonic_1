import React from "react";

interface ModalProps {
  show: boolean;
  message: string;
}

const Modal: React.FC<ModalProps> = ({ show, message }) => {
  if (!show) {
    return null;
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <p>{message}</p>
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
