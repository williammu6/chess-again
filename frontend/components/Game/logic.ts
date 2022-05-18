import { PieceInterface, PieceType } from "../../types/piece";
import { Position } from "../../types/position";

export const getNewPosition = ({
  previousGamePosition,
  piece,
  to
}: {
  previousGamePosition: GamePosition;
  piece: PieceInterface;
  to: Position;
}) => {
  const { x: prevX, y: prevY } = piece.position;
  const { x: newX, y: newY } = to;

  let currentGamePosition = [...previousGamePosition];

  currentGamePosition[prevY] =
    currentGamePosition[prevY].substring(0, prevX) +
    "x" +
    currentGamePosition[prevY].substring(prevX + 1);

  currentGamePosition[newY] =
    currentGamePosition[newY].substring(0, newX) +
    piece +
    currentGamePosition[newY].substring(newX + 1);

  return currentGamePosition;
};

export const isMoveValid = ({
  gamePosition,
  piece,
  from,
  to
}: {
  gamePosition: GamePosition;
  piece: PieceInterface;
  from: Position;
  to: Position;
}) => {
  switch (piece.type) {
    case PieceType.PAWN:
      return from.y - to.y <= 2;
    default:
      return true;
  }
};
