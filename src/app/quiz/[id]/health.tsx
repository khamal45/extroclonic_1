import Image from "next/image";

type HealthProps = {
  health: number;
};

export default function Health({ health }: HealthProps) {
  return (
    <main>
      <div style={{ display: "flex" }}>
        {Array.from({ length: health }, (_, index) => (
          <Image
            key={index}
            src="/images/hearth.png"
            alt="Heart"
            width={20}
            height={20}
          />
        ))}
      </div>
    </main>
  );
}
