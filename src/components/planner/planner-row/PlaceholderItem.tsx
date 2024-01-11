import { useDroppable } from '@dnd-kit/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent } from 'react';

interface Props {
  date: Date;
  mealId?: number;
  updateMeal: () => void;
}

const PlaceholderItem: FunctionComponent<Props> = ({ date, mealId, updateMeal }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: date.toDateString(),
    data: {
      mealId,
      date,
      updateMeal,
    },
  });
  const style = {
    color: isOver ? 'var(--mikesae-components-color-primary-default)' : undefined,
  };
  return (
    <div ref={setNodeRef}>
      <div className='meal-placeholder planner-row-item'>
        <FontAwesomeIcon className='link-icon' style={style} icon={faPlusCircle} />
      </div>
    </div>
  );
};

export default PlaceholderItem;
