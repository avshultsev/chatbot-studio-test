import https from 'https';
import { IncomingMessage } from 'http';
import { IOptions } from './tsAbstractions/interfaces';
import { Methods, SupportedExtensions } from './tsAbstractions/enums';


export const getObjFromIterable = (iterable: IterableIterator<[string, string]>): Record<string, unknown> => {
  const obj: Record<string, unknown> = {};
  for (const [name, value] of iterable) obj[name] = value;
  return obj;
};

export const promiseRequest = (options: IOptions): Promise<IncomingMessage> => {
  return new Promise(resolve => https.request(options, resolve).end());
};

export const createOptions = (url: string, path = '/', method: Methods): IOptions => ({
  protocol: 'https:',
  hostname: url,
  method,
  path
});

export const retreiveData = async (
  asyncIterable: AsyncIterable<Uint8Array>, 
  enc: BufferEncoding = 'utf-8'
): Promise<string> => {
  const chunks: Uint8Array[] = [];
  for await (const chunk of asyncIterable) chunks.push(chunk);
  const data = Buffer.concat(chunks).toString(enc);
  return data;
};

export const isSupportedExtension = (pathname: string): boolean => {
  const dotIdx = pathname.indexOf('.');
  const ext = pathname.substring(dotIdx + 1).toLowerCase();
  return ext in SupportedExtensions;
};