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