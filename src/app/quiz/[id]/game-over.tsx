export default function GameOver({ score }: { score: string }) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h5>Game Over</h5>
      <p>Your Score: {score}</p>
    </div>
  );
}
