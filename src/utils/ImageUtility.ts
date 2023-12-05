import { v4 as uuid } from 'uuid';
import config from 'aws-exports';
import { Storage } from 'aws-amplify';

const { aws_user_files_s3_bucket_region: region, aws_user_files_s3_bucket: bucket } = config;

export async function storeImage(file: any, userName: string, itemName: string) {
  const extension = file.name.split('.')[1];
  const { type: mimeType } = file;
  const key = `images/${uuid()}${userName}-${itemName}.${extension}`;
  const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;

  try {
    await Storage.put(key, file, {
      contentType: mimeType,
    });
  } catch (error) {
    console.log('AddItemModal error: ', error);
  }
  return url;
}
