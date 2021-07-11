import { createOptions, promiseRequest, retreiveData, isSupportedExtension, retreiveBuffer } from '../lib';
import { ISourceResponse } from '../tsAbstractions/interfaces';
import { Methods } from '../tsAbstractions/enums';

export const retreiveImageUrl = async (): Promise<ISourceResponse> => {
  const options = createOptions('random.dog', '/woof.json', Methods.GET);
  const sourceResponse = await promiseRequest(options)
    .then(retreiveData)
    .then((data: string) => {
      const response: ISourceResponse = JSON.parse(data);
      const { fileSizeBytes, url } = response;
      const urlObj = new URL(url);
      const { pathname } = urlObj;
      const isSupported = isSupportedExtension(pathname);
      if (!isSupported) throw new Error('Unsupported extension!');
      return { fileSizeBytes, url: pathname };
    })
    .catch(err => { 
      console.log(err + '\n');
      console.log('Fetching one more time...\n');
      return retreiveImageUrl();
    });
  return sourceResponse;
};

export const retreiveImageData = async (path: string): Promise<Buffer> => {
  const options = createOptions('random.dog', path, Methods.GET);
  return promiseRequest(options).then(retreiveBuffer);
};