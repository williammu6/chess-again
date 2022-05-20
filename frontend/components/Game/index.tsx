import { useCallback, useEffect, useMemo, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { WebSocketHook } from "react-use-websocket/dist/lib/types";
import { BoardPieces, FenGamePosition, Position } from "../../types/position";
import { isMoveValid } from "./logic";
import Board from "./Board";
import { PieceInterface, PieceType } from "../../types/piece";
import dynamic from "next/dynamic";

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

const buildBoard = (gamePosition: FenGamePosition, side: Side): BoardPieces => {
  return gamePosition.map((row: string, y: number) => {
    const pieceLetters = Array.from(row);

    return pieceLetters.map(
      (pieceLetter, x) =>
        ({
          ID: `${x}${y}`,
          type: pieceTypeByLetter(pieceLetter),
          pieceLetter,
          position: { x, y },
          color: pieceLetter.toUpperCase() == pieceLetter ? "white" : "black",
          side
        } as PieceInterface)
    );
  });
};

interface GameProps {
  player: IPlayer;
}

const Game = ({ player }: GameProps) => {
  const [turn, setTurn] = useState<Side>("white");
  const [boardPieces, setBoardPieces] = useState<BoardPieces>(() => {
    return buildBoard(STARTING_POSITION_FEN, player.side);
  });

  useEffect(() => {
    setBoardPieces(currentBoardPieces => {
      if (player.side == "black") currentBoardPieces.reverse();
      return currentBoardPieces;
    });
  }, []);

  const onMove = ({ piece, to }: { piece: PieceInterface; to: Position }) => {
    setBoardPieces(previousBoardPieces => {
      setTurn(previousTurn => (previousTurn == "white" ? "black" : "white"));
      const newBoardPieces = [...previousBoardPieces];
      const pieceMoved = { ...piece, position: to };

      newBoardPieces[piece.position.y][piece.position.x].type = PieceType.NULL;
      newBoardPieces[to.y][to.x] = pieceMoved;

      return newBoardPieces;
    });
  };

  const validMove = (move: {
    piece: PieceInterface;
    to: Position;
  }): boolean => {
    return (
      move.piece.color == turn &&
      isMoveValid({
        boardPieces,
        ...move
      })
    );
  };

  const canMove = (piece: PieceInterface) => {
    return piece.color == turn;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Board
        key={turn}
        boardPieces={boardPieces}
        side={player.side}
        onMove={onMove}
        isMoveValid={validMove}
        canMove={canMove}
      />
    </DndProvider>
  );
};

export default Game;
