import React from 'react';

const cloudFrontUrl = "https://d3rdc75t3f75ej.cloudfront.net";

function getCloudFrontSrc(imageUrl:string) {
    const lastIndexOf:number = imageUrl.lastIndexOf("/");
    const imageName = imageUrl.slice(lastIndexOf);
    return `${cloudFrontUrl}${imageName}`;
}

const ImageComponent: React.FC<{src:string}> = ({src}) => {
    return <img className="img-item" src={getCloudFrontSrc(src)} alt=""/>;
}

export const ImageComponentDetail: React.FC<{src:string}> = ({src}) => {
    return <img className="img-item-large" src={getCloudFrontSrc(src)} alt=""/>;
}


export default ImageComponent;