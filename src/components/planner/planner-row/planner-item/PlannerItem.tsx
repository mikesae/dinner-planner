import { ImageComponent } from 'components/image/ImageComponent';
import { FunctionComponent } from 'react';

interface Props {
  imageSrc: string;
  name: string;
}

const PlannerItem: FunctionComponent<Props> = ({ imageSrc, name }) => {
  return (
    <figure className='planner-item planner-row-item'>
      <ImageComponent src={imageSrc} alt={name} />
      <figcaption>
        <label className='label-item'>{name}</label>
      </figcaption>
    </figure>
  );
};

export default PlannerItem;
