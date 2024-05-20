import Image from "next/image";
import "./module.css";
export default function Home() {
  return (
    <main>
      <div className="header">
        <div className="logoWrapper">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
          <h2>EXTROCLONIC</h2>
        </div>

        <li>
          <ul>
            <li className="active">Beranda</li>
            <li>Game</li>
            <li className="button">Daftar</li>
          </ul>
        </li>
      </div>
    </main>
  );
}
