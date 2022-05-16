import { Flex } from "@chakra-ui/react";
import { IPlayer, Side } from ".";
import Tiles from "./Tile";

const STARTING_POSITION = [
  "RNBQKBNR",
  "PPPPPPPP",
  "8",
  "8",
  "8",
  "8",
  "pppppppp",
  "rnbqkbnr",
];

const getTiles = (row: string): string[] => {
  const rowFen: string[] = Array.from(row);

  return rowFen.reduce((tiles, fen) => {
    if (parseInt(fen)) {
      return [...tiles, ...Array.from("x".repeat(parseInt(fen)))];
    }
    return [...tiles, fen];
  }, [] as string[]);
};

export default function Board({ side }: { side: Side }) {
  if (side == "black") STARTING_POSITION.reverse();

  return (
    <>
      {STARTING_POSITION.map((row, index) => {
        const tiles = getTiles(row);

        return (
          <Flex key={`row${index}`}>
            <Tiles tiles={tiles} y={index} side={side} />
          </Flex>
        );
      })}
    </>
  );
}
