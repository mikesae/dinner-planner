import { FunctionComponent } from 'react';

const cloudFrontUrl = 'https://d3rdc75t3f75ej.cloudfront.net';

function getCloudFrontSrc(imageUrl: string) {
  const lastIndexOf: number = imageUrl.lastIndexOf('/');
  const imageName = imageUrl.slice(lastIndexOf);
  return `${cloudFrontUrl}${imageName}`;
}

export const ImageComponent: FunctionComponent<{ src: string; alt: string }> = ({ src, alt }) => (
  <img draggable='false' className='img-item' src={getCloudFrontSrc(src)} alt={alt} />
);

export const ImageComponentDetail: FunctionComponent<{ src: string; alt: string }> = ({ src, alt }) => (
  <img draggable='false' className='img-item-large' src={getCloudFrontSrc(src)} alt={alt} />
);
