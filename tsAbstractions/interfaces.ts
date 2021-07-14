import { RequestOptions } from 'http';
import { Methods } from './enums';
import sharp from 'sharp';

export interface IOptions extends RequestOptions {
  protocol: string,
  hostname: string,
  method: Methods,
  path: string,
}

export interface ISourceResponse {
  fileSizeBytes: number,
  url: string
}

export interface IPostRequestBody {
  width: number,
  height: number
}

export interface IQueryParams {
  id?: string,
  ext?: string,
  width?: number,
  height?: number,
  bytesSize?: number,
}

export interface ISharpBufferObj {
  data: Buffer;
  info: sharp.OutputInfo;
}