import type { NextPage } from "next";
import Game from "../components/Game";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Game player={{ side: "black" }} />
    </div>
  );
};

export default Home;
