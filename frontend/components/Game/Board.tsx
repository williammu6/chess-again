import { Flex } from "@chakra-ui/react";
import { Side } from ".";
import { BoardPieces } from "../../types/position";
import Tile from "./Tile";

interface BoardProps {
  side: Side;
  boardPieces: BoardPieces;
  onMove: Function;
  isMoveValid: Function;
}

export default function Board({
  side,
  boardPieces,
  onMove,
  isMoveValid
}: BoardProps) {
  return (
    <Flex direction="column" key={`board`}>
      {boardPieces.map((piecesInRow, y: number) => {
        return (
          <Flex direction={"row"}>
            {piecesInRow.map((piece, x) => (
              <Tile
                key={`tile${y}${x}`}
                side={side}
                piece={piece}
                position={{ x, y }}
                onMove={onMove}
                isMoveValid={isMoveValid}
              />
            ))}
          </Flex>
        );
      })}
    </Flex>
  );
}
