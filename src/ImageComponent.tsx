import React from 'react';
import {Img} from 'react-image';

const ImageComponent: React.FC<{src:string}> = ({src}) => {
    return <Img className="img-item" src={src} loader={<img className="img-item" src="logo.png" alt=""/>}/>;
}

export default ImageComponent;