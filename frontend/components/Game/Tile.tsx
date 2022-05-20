import { Flex } from "@chakra-ui/react";
import { useState } from "react";
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
  canMove(piece: PieceInterface): boolean;
}

export default function Tile({
  side,
  piece,
  position,
  onMove,
  isMoveValid,
  canMove
}: TileProps) {
  const [{ background }, drop] = useDrop<PieceInterface>(() => ({
    accept: "piece",
    collect: monitor => ({
      background: monitor.canDrop() && monitor.isOver() ? "lightgreen" : null
    }),
    canDrop: (piece, monitor) => {
      return isMoveValid({
        piece: piece,
        to: position
      });
    },
    drop: piece => {
      onMove({
        piece: piece,
        to: position
      });
    }
  }));

  const darkTile =
    (position.y % 2 == 0 && position.x % 2 == 0) ||
    (position.y % 2 == 1 && position.x % 2 == 1);

  const backgroundColor = (side == "black") === darkTile ? "gray" : "beige";

  return (
    <Flex
      ref={drop}
      fontSize={"8vh"}
      width={"10vh"}
      height={"10vh"}
      backgroundColor={background || backgroundColor}
      alignItems="center"
      justifyContent="center"
      key={`${position.x}${position.y}`}
      userSelect="none"
    >
      {piece && piece.type != PieceType.NULL ? (
        <Piece piece={piece} canMove={canMove} />
      ) : null}
    </Flex>
  );
}
