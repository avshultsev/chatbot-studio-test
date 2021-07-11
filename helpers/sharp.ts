import sharp from 'sharp';

export const sharpResize = (
  rawBuffer: Buffer,
  width: number,
  height: number): Promise<{
    data: Buffer,
    info: sharp.OutputInfo
  }> => {
  return sharp(rawBuffer).resize(width, height, { fit: 'fill' }).toBuffer({ resolveWithObject: true });
};