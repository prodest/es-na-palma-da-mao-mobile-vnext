import { File } from '@ionic-native/file';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Environment, EnvVariables } from '@espm/core';
import { Observable } from 'rxjs/Observable';
import { share, mergeMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';

import { ApiBaseService } from '../state/api-base.service';
import { Document } from '../state/documents.model';
import { DestinationReceive, CaptureReceive, CapturePostBody, ForwardPostBody, ForwardsReceive } from '../state/documents-to-send.model';

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
  getDestinations(tipo: number, orgaoId?: string): Observable<DestinationReceive[]> {
    let params: string = `?Tipo=${tipo}`;

    if (tipo > 0) {
      params = params + `&OrgaoId=${orgaoId}`
    } 
    
    return this.http.get<DestinationReceive[]>(this.endpoint(`Destinos${params}`), {}).pipe(share());
  }

  captureDocuments(fileName: string, body: CapturePostBody): Observable<CaptureReceive> {
    const fileUrlSplited = body.File.url.split('/')
    const directoryUrl = fileUrlSplited.slice(0, fileUrlSplited.length-1).join('/')
    let buffer: Observable<ArrayBuffer>;

    if (body.File.buffer) {
      buffer = of(body.File.buffer);
    }else {
      buffer = fromPromise(this.file.readAsArrayBuffer(directoryUrl, body.File.name));
    }
    
    return buffer
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

  createForwards(body: ForwardPostBody): Observable<ForwardsReceive> {
    return this.http.post<ForwardsReceive>(this.endpoint('Encaminhamentos'), body);
  }
}
