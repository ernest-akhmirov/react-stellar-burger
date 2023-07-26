import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';

const DraggableConstructorElement = ({ id, index, moveItem, children }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'constructorElement',
    hover(item) {
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
    type: 'constructorElement',
    item: { id, index },
    
  });

  
  drag(drop(ref));

  return (
    <div ref={ref} >
      {children}
    </div>
  );
};

export default DraggableConstructorElement;

