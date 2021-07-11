import { find } from '../dal';
import { Request, Response } from 'express';
import { ICollectionItem } from '../tsAbstractions/interfaces';

export const getHandler = async (req: Request, res: Response): Promise<void> => {
  const items: ICollectionItem[] = await find(req.query);
  if (items.length === 0) return res.status(404).end();
  if (items.length === 1) return res.end(Buffer.from(items[0].data, 'base64'));
  const meta = items.map(({ data, ...meta }) => meta);
  console.log({ meta });
  const strMeta = JSON.stringify(meta);
  res
    .setHeader('Content-Type', 'application/json')
    .end(strMeta);
};