type HealthProps = {
  health: number;
};

export default function Health(health: HealthProps) {
  return (
    <main>
      <div>{health.health}</div>
    </main>
  );
}
