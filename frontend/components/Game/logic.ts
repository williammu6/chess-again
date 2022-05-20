import { PieceInterface, PieceType } from "../../types/piece";
import { BoardPieces, Position } from "../../types/position";

export const getPieceAtPosition = (
  boardPieces: BoardPieces,
  { x, y }: Position
): PieceInterface => {
  return boardPieces[y][x];
};

export const isPositionEmpty = (piece: PieceInterface): boolean => {
  return piece.type == PieceType.NULL;
};

export const isMoveValid = ({
  boardPieces,
  piece,
  to
}: {
  boardPieces: BoardPieces;
  piece: PieceInterface;
  to: Position;
}) => {
  const pieceAtPosition = getPieceAtPosition(boardPieces, to);
  switch (piece.type) {
    case PieceType.PAWN:
      return piece.position.y - to.y <= 2 && isPositionEmpty(pieceAtPosition);
    default:
      return true;
  }
};
