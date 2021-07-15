import https from 'https';
import { IncomingMessage } from 'http';
import { IOptions } from './tsAbstractions/interfaces';
import { Methods, SupportedExtensions } from './tsAbstractions/enums';

export const promiseRequest = (options: IOptions): Promise<IncomingMessage> => {
  return new Promise(resolve => https.request(options, resolve).end());
};

export const createOptions = (url: string, path = '/', method: Methods): IOptions => ({
  protocol: 'https:',
  hostname: url,
  method,
  path
});

export const retreiveBuffer = async (
  asyncIterable: AsyncIterable<Uint8Array>, 
): Promise<Buffer> => {
  const chunks: Uint8Array[] = [];
  for await (const chunk of asyncIterable) chunks.push(chunk);
  const buffer = Buffer.concat(chunks);
  return buffer;
};

export const retreiveData = async (
  asyncIterable: AsyncIterable<Uint8Array>, 
  enc: BufferEncoding = 'utf-8'
): Promise<string> => {
  const buffer = await retreiveBuffer(asyncIterable);
  const data = buffer.toString(enc);
  return data;
};

export const isSupportedExtension = (pathname: string): boolean => {
  const dotIdx = pathname.indexOf('.');
  const ext = pathname.substring(dotIdx + 1).toLowerCase();
  return ext in SupportedExtensions;
};

export const createRandomString = (length = 10): string => {
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
  const upperCase = lowerCase.toUpperCase();
  const digits = '0123456789';
  const CHARS = upperCase + lowerCase + digits;
  let str = '';
  while (str.length < length) {
    const index = Math.floor(Math.random() * CHARS.length);
    str += CHARS[index];
  }
  return str;
};

export const wrapWithTicks = (str: string | any): string => `'${str}'`;
export const isString = (value: unknown): boolean => typeof value === 'string';