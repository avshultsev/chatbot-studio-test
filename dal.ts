import fs from 'fs/promises';
import path from 'path';
import db from './db';
import { createRandomString } from './lib';
import { IQueryParams, ISharpBufferObj } from './tsAbstractions/interfaces';

const images = db('Images');

export const save = async (sharpBufferObj: ISharpBufferObj): Promise<void> => {
  const { data, info } = sharpBufferObj;
  const id = createRandomString();
  const row = {
    id,
    format: info.format,
    width: info.width,
    height: info.height,
    channels: info.channels,
    premultiplied: info.premultiplied,
    size: info.size,
  };

  return images.insert(row)
    .then(() => {
      console.log('Data successfully inserted!');
      const filePath = path.join(process.cwd(), 'static', 'images', `${id}.${info.format}`);
      fs.writeFile(filePath, data, { encoding: 'base64' });
    })
    .catch(console.log);
};

export const find = async (query: IQueryParams): Promise<any> => {
  try {
    const res = await images.retreive(query);
    return res.rows;
  } catch (err) {
    console.log(err);  
  }
};