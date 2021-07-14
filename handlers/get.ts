import { find } from '../dal';
import { Request, Response } from 'express';

export const getHandler = async (req: Request, res: Response): Promise<void> => {
  const items = await find(req.query);
  if (!items) return res.status(404).end();
  res
    .setHeader('Content-Type', 'application/json')
    .end(JSON.stringify(items));
};