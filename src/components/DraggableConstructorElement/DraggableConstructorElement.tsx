import { useDrag, useDrop } from "react-dnd";
import React, {FC, ReactElement, useRef} from "react";


type TDraggableConstructorElementProps = {
  id: string;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number,) => void;
  children: ReactElement;
}
const DraggableConstructorElement: FC<TDraggableConstructorElementProps> = ({ id, index, moveItem, children }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [, drop] = useDrop({
    accept: "constructorElement",
    hover(item: {index: number}): void {
      if (!ref.current) {
        return;
      }

      if (item.index === index) {
        return;
      }

      moveItem(item.index, index);
      item.index = index;
    },
  });

  const [, drag] = useDrag({
    type: "constructorElement",
    item: { id, index },
  });

  drag(drop(ref));

  return <div ref={ref}>{children}</div>;
};

export default DraggableConstructorElement;
