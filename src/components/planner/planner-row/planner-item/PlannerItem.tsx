import { useDraggable } from '@dnd-kit/core';
import { ImageComponent } from 'components/image/ImageComponent';
import { FunctionComponent } from 'react';
import { CSS } from '@dnd-kit/utilities';

interface Props {
  image: string;
  name: string;
  id: string;
  date: Date;
  mealId: number;
  updateMeal: () => void;
}

const PlannerItem: FunctionComponent<Props> = ({ image, name, id, date, mealId, updateMeal }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `${date.toDateString()}:${name}`,
    data: {
      mealId,
      name,
      date,
      id,
      updateMeal,
    },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 999 : undefined,
  };

  return (
    <figure className='planner-item planner-row-item' ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <ImageComponent src={image} alt={name} />
      <figcaption>
        <label className='label-item'>{name}</label>
      </figcaption>
    </figure>
  );
};

export default PlannerItem;
