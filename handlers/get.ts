import { NextFunction, RequestHandler } from 'express';
import { getObjFromIterable } from '../lib';

export const get: RequestHandler = (req: Request, res: Response, next?: NextFunction): void => {
  const { searchParams } = new URL(req.url);
  const queryParamsObj = getObjFromIterable(searchParams.entries());

};