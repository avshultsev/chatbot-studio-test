import sharp from 'sharp';
import { ISharpBufferObj } from '../tsAbstractions/interfaces';

export const sharpResize = (
  rawBuffer: Buffer,
  width: number,
  height: number): Promise<ISharpBufferObj> => {
  return sharp(rawBuffer).resize(width, height, { fit: 'fill' }).toBuffer({ resolveWithObject: true });
};