import { PieceInterface } from "./piece";

export type BoardPieces = PieceInterface[][];

export type FenGamePosition = string[];

export interface Position {
  x: number;
  y: number;
}
