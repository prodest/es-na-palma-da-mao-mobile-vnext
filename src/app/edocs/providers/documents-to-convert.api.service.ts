import { Environment, EnvVariables } from '@espm/core';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConvertToPdfPostBody } from '../state';
import { mergeMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { File } from '@ionic-native/file';
import { ApiBaseService } from '../state/api-base.service';

@Injectable()
export class DocumentsToConvertApiService extends ApiBaseService<any> {
  /**
   *
   *
   */
  constructor(private http: HttpClient, @Inject(EnvVariables) env: Environment, private file: File) {
    super(`${env.api.convertToPdf}/create/`);
  }

  convertToPdf(body: ConvertToPdfPostBody): Observable<ArrayBuffer> {
    const fileNameSplited = body.image.url.split('/');
    const directoryUrl = fileNameSplited.slice(0, fileNameSplited.length - 1).join('/');

    return fromPromise(this.file.readAsArrayBuffer(directoryUrl, fileNameSplited[fileNameSplited.length - 1])).pipe(
      mergeMap(fileBuffer => {
        const formData = new FormData();
        formData.append('size', String(body.size));
        formData.append('landscape', String(body.landscape));
        formData.append('horizontalAlign', String(body.horizontalAlign));
        formData.append('verticalAlign', String(body.verticalAlign));
        formData.append('image', new Blob([fileBuffer]), fileNameSplited[fileNameSplited.length - 1]);
        return this.http.post(this.endpoint(`image`), formData, { responseType: 'arraybuffer' });
      })
    );
  }
}
