import { Flex } from "@chakra-ui/react";
import { Side } from ".";
import { PieceInterface } from "../../types/piece";
import { BoardPieces, Position } from "../../types/position";
import Tile from "./Tile";

interface BoardProps {
  side: Side;
  boardPieces: BoardPieces;
  onMove({ piece, to }: { piece: PieceInterface; to: Position }): void;
  isMoveValid({ piece, to }: { piece: PieceInterface; to: Position }): boolean;
  canMove(piece: PieceInterface): boolean;
}

export default function Board({ side, boardPieces, ...methods }: BoardProps) {
  return (
    <Flex direction="column" key={`board`}>
      {boardPieces.map((piecesInRow, y: number) => {
        return (
          <Flex direction={"row"} key={y}>
            {piecesInRow.map((piece, x) => (
              <Tile
                key={`tile${y}${x}`}
                side={side}
                piece={piece}
                position={{ x, y }}
                {...methods}
              />
            ))}
          </Flex>
        );
      })}
    </Flex>
  );
}
