import { FunctionComponent } from 'react';
import ImageComponent from './ImageComponent';

interface Props {
	imageSrc: string;
	name: string;
}

const PlannerItem: FunctionComponent<Props> = ({ imageSrc, name }) => {
	return (
		<div className='planner-item planner-row-item'>
			<ImageComponent src={imageSrc} />
			<label className='label-item'>{name}</label>
		</div>
	);
};

export default PlannerItem;
