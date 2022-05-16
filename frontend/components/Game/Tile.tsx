import { Flex } from "@chakra-ui/react";
import { useDrop } from "react-dnd";
import { Side } from ".";
import { Position } from "../../types/position";
import Piece from "./Piece";

interface TileProps {
  position: Position;
  piece: string;
  side: Side;
}

const Tile = ({ side, piece, position }: TileProps) => {
  const [{ background }, drop] = useDrop(() => ({
    accept: "piece",
    collect: (monitor) => ({
      background: monitor.isOver() ? "gray" : null,
    }),
    canDrop: (item, monitor) => {
      return true;
    },
    drop: (item) => {
      console.log(item, `dropped on [${position.x}, ${position.y}]`);
    },
  }));

  const darkTile =
    (position.y % 2 == 0 && position.x % 2 == 0) ||
    (position.y % 2 == 1 && position.x % 2 == 1);
  const backgroundColor = (side == "black") === darkTile ? "brown" : "beige";

  return (
    <Flex
      ref={drop}
      fontSize={"8vh"}
      width={"12vh"}
      height={"12vh"}
      backgroundColor={background || backgroundColor}
      alignItems="center"
      justifyContent="center"
      key={`${position.x}${position.y}`}
      userSelect="none"
    >
      {piece !== "x" && <Piece piece={piece} />}
    </Flex>
  );
};

export default function Tiles({
  side,
  pieces,
  y,
}: {
  side: Side;
  pieces: string[];
  y: number;
}) {
  return (
    <>
      {pieces.map((piece, x: number) => (
        <Tile key={`tile${x}`} side={side} piece={piece} position={{ x, y }} />
      ))}
    </>
  );
}
