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
  position: Position;
}

export default function Piece({ piece, position }: PieceProps) {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: "piece",
      item: { piece, position },
      collect: (monitor: DragSourceMonitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  );

  return (
    <Flex ref={dragRef} opacity={opacity}>
      {pieces[piece.pieceLetter]}
    </Flex>
  );
}
