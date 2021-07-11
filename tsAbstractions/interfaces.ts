import { RequestOptions } from 'http';
import { Methods } from './enums';


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
  id: string,
  ext: string,
  width: number,
  height: number,
  bytesSize: number,
  data: string
}