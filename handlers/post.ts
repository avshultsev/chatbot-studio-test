import { Request, Response } from 'express';
import { retreiveImageUrl, retreiveImageData } from '../helpers/retreiveImage';

export const postHandler = async (req: Request, res: Response): Promise<void> => {
  // const { body } = req;
  const stream = await retreiveImageUrl().then(({ url }) => retreiveImageData(url));
  stream.pipe(res);
};