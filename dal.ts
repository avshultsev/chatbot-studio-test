import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { createRandomString } from './lib';
import { ICollectionItem } from './tsAbstractions/interfaces';

export const save = async (data: Buffer, info: sharp.OutputInfo): Promise<void> => {
  const collectionPath = path.join(process.cwd(), '..', 'sampleDB', 'collection.json');
  return fs.readFile(collectionPath, { encoding: 'utf-8' })
    .then((jsonCollection) => {
      const collection: ICollectionItem[] = JSON.parse(jsonCollection);
      const collectionItem: ICollectionItem = {
        id: createRandomString(),
        ext: info.format,
        width: info.width,
        height: info.height,
        bytesSize: info.size,
        data: data.toString('base64'),
      };
      collection.push(collectionItem);

      return fs.writeFile(collectionPath, JSON.stringify(collection), { encoding: 'utf-8' });
    });
};
// export const find = async () => {};