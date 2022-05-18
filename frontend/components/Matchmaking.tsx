import useWebSocket from "react-use-websocket";
import { GameProvider } from "../contexts/game";
import Game from "./Game";

interface MatchmakingProps {
  username: string;
}

export default function Matchmaking({ username }: MatchmakingProps) {
  const conn = useWebSocket(`ws://localhost:8080/play?username=${username}`);

  if (!conn.lastMessage) {
    return <h1>Matchmaking ...</h1>;
  }

  return (
    <GameProvider>
      <Game conn={conn} />
    </GameProvider>
  );
}
