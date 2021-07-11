import { Request, Response } from 'express';
import { sharpResize } from '../helpers/sharp';
import { retreiveImageUrl, retreiveImageData } from '../helpers/retreiveImage';
import { IPostRequestBody } from '../tsAbstractions/interfaces';
import { save } from '../dal';

export const postHandler = async (req: Request, res: Response): Promise<void> => {
  const body: IPostRequestBody = req.body;
  const { width, height } = body;
  retreiveImageUrl()
    .then(({ url }) => retreiveImageData(url))
    .then(imgBuffer => sharpResize(imgBuffer, width, height))
    .then(save);
  res
    .setHeader('Content-Type', 'application/json')
    .end(JSON.stringify({ result: 'Success!' }));
};