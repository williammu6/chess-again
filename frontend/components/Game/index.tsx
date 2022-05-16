import { WebSocketHook } from "react-use-websocket/dist/lib/types";
import Board from "./Board";

export type Side = "black" | "white";

export interface IPlayer {
  username: string;
  side: Side;
  ws: WebSocketHook<MessageEvent<any>>;
}

interface GameProps {
  player: IPlayer;
}

export default function Game({ player }: GameProps) {
  return <Board side={"black"}/>;
}
