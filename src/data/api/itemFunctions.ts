import { API, graphqlOperation, Storage } from 'aws-amplify';
import config from 'aws-exports';
import { createItem } from 'data/graphql/mutations';
import { v4 as uuid } from 'uuid';

const { aws_user_files_s3_bucket_region: region, aws_user_files_s3_bucket: bucket } = config;

export async function storeNewItem(userName: string, itemName: string, category: string, file: any) {
  const extension: string = file.name.split('.')[1];
  const key = `images/${uuid()}${userName}-${itemName}.${extension}`;
  const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
  const inputData = {
    name: itemName,
    category: category,
    image: url,
    userName: userName,
  };

  try {
    const { type: mimeType } = file;

    await Storage.put(key, file, {
      contentType: mimeType,
    });
    await API.graphql(graphqlOperation(createItem, { input: inputData }));
  } catch (error) {
    console.log('storeNewItem error: ', error);
  }
}
