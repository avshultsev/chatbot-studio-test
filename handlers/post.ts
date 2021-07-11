import { Request, Response } from 'express';
import { sharpResize } from '../helpers/sharp';
import { retreiveImageUrl, retreiveImageData } from '../helpers/retreiveImage';
import { IPostRequestBody } from '../tsAbstractions/interfaces';
import { save } from '../dal';

export const postHandler = async (req: Request, res: Response): Promise<void> => {
  const body: IPostRequestBody = req.body;
  const { width, height } = body;
  const imgBuffer = await retreiveImageUrl().then(({ url }) => retreiveImageData(url));
  const { data, info } = await sharpResize(imgBuffer, width, height);
  await save(data, info);
  res
    .setHeader('Content-Type', 'application/json')
    .end(JSON.stringify({ result: 'Success!' }));
};