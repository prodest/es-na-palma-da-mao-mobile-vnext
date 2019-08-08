import { FileTransfer } from '@ionic-native/file-transfer';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
// import { ID } from '@datorama/akita';
import { Environment, EnvVariables, AuthService } from '@espm/core';
import { Observable } from 'rxjs/Observable';
import { share, map, mergeMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { ApiBaseService } from './api-base.service';
import { Document } from './documents.model';
import { Destination, CaptureReceive, CapturePostBody, ForwardsRecieve, ForwardPostBody } from './documents-to-send.model';

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
  getDestinations(): Observable<Destination[]> {
    return this.http.get<Destination[]>(this.endpoint(`Destinos`), {}).pipe(share());
  }

  captureDocuments(body: CapturePostBody): Observable<CaptureReceive> {
    const fileTransfer = this.transfer.create();
    return this.auth.getAccessToken().pipe(
      mergeMap(token => fromPromise(fileTransfer.upload(body.File, this.endpoint('Documentos'), {
        fileKey: 'File',
        params: {
          'Assinar': String(body.Assinar),
          'ClasseId': String(body.ClasseId),
          'Natureza': String(body.Natureza),
          'ValorLegal': String(body.ValorLegal)
        },
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
