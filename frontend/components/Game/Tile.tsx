import { Flex } from "@chakra-ui/react";
import { Side } from ".";

type Position = {
  x: number;
  y: number;
};

interface TileProps {
  position: Position;
  tile: string;
  side: Side;
}

const Tile = ({ side, tile, position }: TileProps) => {
  const darkTile =
    (position.y % 2 == 0 && position.x % 2 == 0) ||
    (position.y % 2 == 1 && position.x % 2 == 1);
  const backgroundColor = (side == "black") === darkTile ? "brown" : "beige";

  return (
    <Flex
      fontSize={"8vh"}
      width={"12vh"}
      height={"12vh"}
      backgroundColor={backgroundColor}
      alignItems="center"
      justifyContent="center"
      key={`${position.x}${position.y}`}
    >
      {tile != "x" ? tile : null}
    </Flex>
  );
};

export default function Tiles({
  side,
  tiles,
  y,
}: {
  side: Side;
  tiles: string[];
  y: number;
}) {
  return (
    <>
      {tiles.map((tile, x: number) => (
        <Tile key={`tile${x}`} side={side} tile={tile} position={{ x, y }} />
      ))}
    </>
  );
}
