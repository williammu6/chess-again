import { Flex } from "@chakra-ui/react";
import { DragSourceMonitor, useDrag } from "react-dnd";
import { PieceInterface, PieceType } from "../../types/piece";
import { Position } from "../../types/position";

const pieces: { [x: string]: string } = {
  K: "♔",
  Q: "♕",
  R: "♖",
  B: "♗",
  N: "♘",
  P: "♙",
  k: "♚",
  q: "♛",
  r: "♜",
  b: "♝",
  n: "♞",
  p: "♟"
};

interface PieceProps {
  piece: PieceInterface;
  canMove(piece: PieceInterface): boolean;
}

const PieceChar = ({ pieceLetter }: { pieceLetter: string }) => {
  return <span>{pieces[pieceLetter]}</span>;
};

export default function Piece({ piece, canMove }: PieceProps) {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: "piece",
      item: piece,
      collect: (monitor: DragSourceMonitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      }),
      canDrag: _ => {
        return canMove(piece);
      }
    }),
    []
  );

  return (
    <Flex ref={dragRef} opacity={opacity}>
      <PieceChar pieceLetter={piece.pieceLetter} />
    </Flex>
  );
}
