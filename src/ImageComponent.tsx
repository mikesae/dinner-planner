import React from 'react';
import Image, {Shimmer} from 'react-image-shimmer';

const cloudFrontUrl = "https://d3rdc75t3f75ej.cloudfront.net";

function getCloudFrontSrc(imageUrl: string) {
    const lastIndexOf: number = imageUrl.lastIndexOf("/");
    const imageName = imageUrl.slice(lastIndexOf);
    return `${cloudFrontUrl}${imageName}`;
}

const ImageComponent: React.FC<{ src: string }> = ({src}) => {
    return <Image
        nativeImgProps={{className: "img-item"}}
        src={getCloudFrontSrc(src)}
        fallback={<Shimmer height={48} width={64} className="img-item"/>}
        fadeIn={true}
    />;
}

export const ImageComponentDetail: React.FC<{ src: string }> = ({src}) => {
    return <img className="img-item-large" src={getCloudFrontSrc(src)} alt=""/>;
}

export default ImageComponent;