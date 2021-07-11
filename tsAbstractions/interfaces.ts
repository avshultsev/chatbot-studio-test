import { RequestOptions } from 'http';
import { Methods } from './enums';
import { ParsedQs } from 'qs';

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

export interface ICollectionItem {
  [id: string]: string,
  ext: string,
  width: string,
  height: string,
  bytesSize: string,
  data: string
}

export interface IQueryParams extends ParsedQs {
  id?: string,
  ext?: string,
  width?: string,
  height?: string,
  bytesSize?: string,
}