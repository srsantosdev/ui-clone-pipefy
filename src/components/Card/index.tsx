import React, { useRef } from 'react';
import { useDrag, useDrop, DragObjectWithType } from 'react-dnd';
import { useBoard } from '../../hooks/board';
import { TypeCard } from '../../services/api';

import { Container, Label } from './styles';

type ItemProps = DragObjectWithType & {
  index: number;
  listIndex: number;
};

interface CardProps {
  data: TypeCard;
  index: number;
  listIndex: number;
}

const Card: React.FC<CardProps> = ({ data, index, listIndex }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { move } = useBoard();

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', index, listIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover: (item: ItemProps, monitor) => {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = index;

      if (
        draggedIndex === targetIndex &&
        draggedListIndex === targetListIndex
      ) {
        return;
      }

      const targetSize = ref.current?.getBoundingClientRect();
      const targetCenter =
        (Number(targetSize?.bottom) - Number(targetSize?.top)) / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = Number(draggedOffset?.y) - Number(targetSize?.top);

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.listIndex = targetListIndex;
    },
  });

  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        {data.labels.map(label => (
          <Label key={label} color={label} />
        ))}
      </header>

      <p>{data.content}</p>
      {data.user && <img src={data.user} alt="" />}
    </Container>
  );
};

export default Card;
