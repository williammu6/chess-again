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
  ID: string;
  type: PieceType;
  side: Side;
  color: Side;
  position: Position;
  firstMove: boolean;
  pieceLetter: string;
}
