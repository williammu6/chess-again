import { Side } from "../components/Game";
import { Position } from "./position";

export enum PieceType {
  PAWN,
  BISHOP,
  KING,
  QUEEN,
  ROOK,
  KNIGHT,
  NULL
}

export interface PieceInterface {
  type: PieceType;
  side: Side;
  position: Position;
  firstMove: boolean;
  pieceLetter: string;
}
