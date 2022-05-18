import { Flex } from "@chakra-ui/react";
import { DragObjectFactory, useDrop } from "react-dnd";
import { Side } from ".";
import { PieceInterface, PieceType } from "../../types/piece";
import { Position } from "../../types/position";
import Piece from "./Piece";

interface TileProps {
  position: Position;
  piece: PieceInterface;
  side: Side;
  onMove: Function;
  isMoveValid: Function;
}

export default function Tile({
  side,
  piece,
  position,
  onMove,
  isMoveValid
}: TileProps) {
  const [{ background }, drop] = useDrop(() => ({
    accept: "piece",
    collect: monitor => ({
      background: monitor.canDrop() && monitor.isOver() ? "lightgreen" : null
    }),
    canDrop: item => {
      return true;
      // return isMoveValid({
      //   piece: item.piece,
      //   from: item.position,
      //   to: position
      // });
    },
    drop: item => {
      onMove({
        piece: item.piece,
        to: position
      });
    }
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
      {piece && piece.type != PieceType.NULL && (
        <Piece piece={piece} position={position} />
      )}
    </Flex>
  );
}
