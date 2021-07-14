import { QueryResult } from 'pg';
import fs from 'fs/promises';
import path from 'path';
import pool from './db';
import { createRandomString } from './lib';
import { IQueryParams, ISharpBufferObj } from './tsAbstractions/interfaces';

export const save = async (sharpBufferObj: ISharpBufferObj): Promise<void> => {
  const { data, info } = sharpBufferObj;
  const id = createRandomString();
  const row = { 
    id, 
    format:   info.format,
    width:    info.width,
    height:   info.height,
    channels: info.channels,
    premultiplied: info.premultiplied,
    size:     info.size,
  };
  const values = Object.values(row).map(item => typeof item === 'string' ? `'${item}'` : item).join(', ');
  const sql = `INSERT INTO Images VALUES (${values});`;
  pool
    .query(sql)
    .then(res => {
      console.table(res.fields);
      console.table(res.rows);
      return pool.end();
    })
    .catch(err => {
      throw err;
    })
    .then(() => {
      const filePath = path.join(process.cwd(), '..', 'static', 'images', `${id}.${info.format}`);
      return fs.writeFile(filePath, data, { encoding: 'base64' });
    })
    .catch(err => {
      console.log('Error writing static file!\n', err);
    });
};

export const find = (query: IQueryParams): Promise<QueryResult<any>> => {
  const conditions = Object.entries(query).map(([key, value]) => `${key}=${value}`);
  const sql = `SELECT * FROM Images WHERE ${conditions.join(' AND ')};`;
  return pool.query(sql).catch(err => { throw err; });
};