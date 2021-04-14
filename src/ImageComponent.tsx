import React from 'react';
import {Img} from 'react-image';

const cloudFrontUrl = "https://d3rdc75t3f75ej.cloudfront.net";

function getCloudFrontSrc(imageUrl:string) {
    const lastIndexOf:number = imageUrl.lastIndexOf("/");
    const imageName = imageUrl.slice(lastIndexOf);
    return `${cloudFrontUrl}${imageName}`;
}

const ImageComponent: React.FC<{src:string}> = ({src}) => {
    return <Img className="img-item" src={getCloudFrontSrc(src)} loader={<img className="img-item" src="logo.png" alt=""/>}/>;
}

export default ImageComponent;