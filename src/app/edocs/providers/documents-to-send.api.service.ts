import { File } from '@ionic-native/file';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Environment, EnvVariables } from '@espm/core';
import { Observable } from 'rxjs/Observable';
import { share, mergeMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { ApiBaseService } from '../state/api-base.service';
import { Document } from '../state/documents.model';
import { DestinationReceive, CaptureReceive, CapturePostBody, ForwardsRecieve, ForwardPostBody } from '../state/documents-to-send.model';

/**
 *
 *
 */
@Injectable()
export class DocumentsToSendApiService extends ApiBaseService<Document> {
  /**
   *
   *
   */
  constructor(private http: HttpClient,
    @Inject(EnvVariables) env: Environment,
    private file: File) {
    super(`${env.api.edocs}`);
  }

  /**
   *
   */
  getDestinations(): Observable<DestinationReceive[]> {
    return this.http.get<DestinationReceive[]>(this.endpoint(`Destinos`), {}).pipe(share());
  }

  captureDocuments(fileName: string, body: CapturePostBody): Observable<CaptureReceive> {
    const fileNameSplited = body.File.split('/')
    const directoryUrl = fileNameSplited.slice(0, fileNameSplited.length-1).join('/')
    
    return fromPromise(this.file.readAsArrayBuffer(directoryUrl, fileNameSplited[fileNameSplited.length-1]))
      .pipe(
        mergeMap(fileBuffer => {
          const formData = new FormData()
          formData.append('Assinar', String(body.Assinar))
          formData.append('Natureza', String(body.Natureza))
          formData.append('ValorLegal', String(body.ValorLegal))
          formData.append('File', new Blob([fileBuffer]), fileName)
          if (body.ClasseId) {
            formData.append('ClasseId', body.ClasseId)
          }
          return this.http.post<CaptureReceive>(this.endpoint('Documentos'), formData)
        })
      )
  }

  createForwards(body: ForwardPostBody): Observable<ForwardsRecieve> {
    return this.http.post<ForwardsRecieve>(this.endpoint('Encaminhamentos'), body);
  }
}
