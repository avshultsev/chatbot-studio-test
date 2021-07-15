import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export const getImage = (req: Request, res: Response): void => {
  const { filename } = req.params;
  const filePath = path.join(process.cwd(), 'static', 'images', filename);
  const stream = fs.createReadStream(filePath);
  stream
    .on('open', () => {
      res.setHeader('Content-Type', 'image/jpeg');
      stream.pipe(res);
    })
    .on('error', (err) => {
      console.log(err);
      res.status(404).end('No images found!');
    });
};