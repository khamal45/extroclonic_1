import React, { useEffect, useState } from "react";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    let timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, []); // Empty dependency array ensures this effect runs only once

  return <div>Timer {timeLeft} detik</div>;
};

export default Timer;
