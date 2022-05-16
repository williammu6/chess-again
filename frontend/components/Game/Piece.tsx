import { Flex } from "@chakra-ui/react";
import { DragSourceMonitor, useDrag } from "react-dnd";

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
  p: "♟",
};

interface PieceProps {
  piece: string;
}

export default function Piece({ piece }: PieceProps) {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: "piece",
      item: { piece },
      collect: (monitor: DragSourceMonitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );

  return (
    <Flex ref={dragRef} opacity={opacity}>
      {pieces[piece]}
    </Flex>
  );
}
