import { Flex } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Side } from ".";
import Tiles from "./Tile";

const STARTING_POSITION = [
  "rnbqkbnr",
  "pppppppp",
  "8",
  "8",
  "8",
  "8",
  "PPPPPPPP",
  "RNBQKBNR",
];

const getPieces = (row: string): string[] => {
  const rowFen: string[] = Array.from(row);

  return rowFen.reduce((pieces, fen) => {
    if (parseInt(fen)) {
      return [...pieces, ...Array.from("x".repeat(parseInt(fen)))];
    }
    return [...pieces, fen];
  }, [] as string[]);
};

export default function Board({ side }: { side: Side }) {
  if (side == "black") STARTING_POSITION.reverse();

  return (
    <DndProvider backend={HTML5Backend}>
      {STARTING_POSITION.map((row, index) => {
        const pieces = getPieces(row);

        return (
          <Flex key={`row${index}`}>
            <Tiles pieces={pieces} y={index} side={side} />
          </Flex>
        );
      })}
    </DndProvider>
  );
}
