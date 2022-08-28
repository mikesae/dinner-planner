import { FunctionComponent } from 'react';
import ImageComponent from './ImageComponent';
import React from 'react';

interface Props {
    imageSrc: string;
    name: string;
}

const PlannerItem: FunctionComponent<Props> = ({ imageSrc, name }) => {
    return (
        <div>
            <ImageComponent src={imageSrc} />
            <label className="label-item">{name}</label>
        </div>
    );
}

export default PlannerItem;