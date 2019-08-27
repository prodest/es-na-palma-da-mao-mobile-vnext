import { FileTransfer } from '@ionic-native/file-transfer';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Environment, EnvVariables, AuthService } from '@espm/core';
import { Observable } from 'rxjs/Observable';
import { share, map, mergeMap } from 'rxjs/operators';
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
    private transfer: FileTransfer,
    private auth: AuthService) {
    super(`${env.api.edocs}`);
  }

  /**
   *
   */
  getDestinations(): Observable<DestinationReceive[]> {
    return this.http.get<DestinationReceive[]>(this.endpoint(`Destinos`), {}).pipe(share());
  }

  captureDocuments(fileName: string, body: CapturePostBody): Observable<CaptureReceive> {
    const fileTransfer = this.transfer.create();
    const params: { [key: string]: string } = {}
    Object.keys(body).forEach(key => params[key] = String(body[key]))
    return this.auth.getAccessToken().pipe(
      mergeMap(token => fromPromise(fileTransfer.upload(body.File, this.endpoint('Documentos'), {
        fileKey: 'File',
        fileName: fileName,
        params,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }))),
      map(res => {
        try {
          return JSON.parse(res.response)
        } catch (e) {
          return res.response
        }
      })
    )
  }

  createForwards(body: ForwardPostBody): Observable<ForwardsRecieve> {
    return this.http.post<ForwardsRecieve>(this.endpoint('Encaminhamentos'), body);
  }
}
