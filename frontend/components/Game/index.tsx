import { Flex } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { WebSocketHook } from "react-use-websocket/dist/lib/types";
import { GameContext, GameProvider, useGame } from "../../contexts/game";
import { BoardPieces, GamePosition, Position } from "../../types/position";
import { getNewPosition, isMoveValid } from "./logic";
import Board from "./Board";
import Tile from "./Tile";
import { PieceInterface, PieceType } from "../../types/piece";

export type Side = "black" | "white";

export interface IPlayer {
  username?: string;
  side: Side;
  ws?: WebSocketHook<MessageEvent<any>>;
}

const STARTING_POSITION_FEN = [
  "rnbqkbnr",
  "pppppppp",
  "xxxxxxxx",
  "xxxxxxxx",
  "xxxxxxxx",
  "xxxxxxxx",
  "PPPPPPPP",
  "RNBQKBNR"
];

const pieceTypeByLetter = (pieceLetter: string): PieceType | null => {
  switch (pieceLetter.toUpperCase()) {
    case "P":
      return PieceType.PAWN;
    case "B":
      return PieceType.BISHOP;
    case "K":
      return PieceType.KING;
    case "Q":
      return PieceType.QUEEN;
    case "N":
      return PieceType.KNIGHT;
    case "R":
      return PieceType.ROOK;
    case "X":
      return PieceType.NULL;
    default:
      throw new Error("Invalid piece letter");
  }
};

const buildBoard = (gamePosition: GamePosition, side: Side): BoardPieces => {
  return gamePosition.map((row: string, y: number) => {
    const pieceLetters = Array.from(row);

    return pieceLetters.map(
      (pieceLetter, x) =>
        ({
          type: pieceTypeByLetter(pieceLetter),
          pieceLetter,
          position: { x, y },
          side
        } as PieceInterface)
    );
  });
};

interface GameProps {
  player: IPlayer;
}

export default function Game({ player }: GameProps) {
  const [boardPieces, setBoardPieces] = useState<BoardPieces>(() => {
    if (player.side == "black") STARTING_POSITION_FEN.reverse();
    return buildBoard(STARTING_POSITION_FEN, player.side);
  });

  const onMove = ({ piece, to }: { piece: PieceInterface; to: Position }) => {
    console.log(piece, to);
    setBoardPieces(previousBoardPieces => {
      const newBoardPieces = [...previousBoardPieces];
      const pieceMoved = { ...piece, position: to };

      newBoardPieces[piece.position.y][piece.position.x].type = PieceType.NULL;
      newBoardPieces[to.y][to.x] = pieceMoved;

      return newBoardPieces;
    });
  };

  const validMove = (move: { piece: string; from: Position; to: Position }) => {
    return true;
    // return isMoveValid({
    //   gamePosition,
    //   ...move
    // });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {boardPieces && (
        <Board
          boardPieces={boardPieces}
          side={player.side}
          onMove={onMove}
          isMoveValid={validMove}
        />
      )}
    </DndProvider>
  );
}
