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

      <div className="main">
        <div className="mainText">
          <h2>Welcome To</h2>
          <h1>EXTROCLONIC</h1>
          <p>
            Extroclonic merupakan sebuah Website Quiz yang menciptakan sebuah
            arti dengan menggabungkan nuansa Teknologi dan pendidikan
          </p>

          <div className="buttonPrimary">Mulai sekarang juga</div>
        </div>
        <div className="mainImage">
          <img src="/imageKubus.png" alt="Oranmen" className="mainImg" />
        </div>
      </div>
      <div className="footer">
        <p>Copyright 2023. All Rights Reserved</p>
      </div>
    </main>
  );
}
