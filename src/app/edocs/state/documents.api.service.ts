import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { Environment, EnvVariables } from '@espm/core';
import { Observable } from 'rxjs/Observable';
import { map, share } from 'rxjs/operators';

import { ApiBaseService } from './api-base.service';
import { Document } from './documents.model';

/**
 *
 *
 */
@Injectable()
export class DocumentsApiService extends ApiBaseService<Document> {
  /**
   *
   *
   */
  constructor(private http: HttpClient, @Inject(EnvVariables) env: Environment) {
    super(`${env.api.edocs}/documento/fase-assinatura`);
  }

  /**
   *
   */
  getAllWaitingForMySignature = (page: number, pageSize: number): Observable<Document[]> => {
    return this.http
      .get<Document[]>(this.endpoint(`aguardando`), { params: this.toParams({ page, pageSize }) })
      .pipe(map(e => this.enhance(e)), share());
  };

  /**
   *
   */
  getAllSignedByMe = (page: number, pageSize: number): Observable<Document[]> => {
    return this.http
      .get<Document[]>(this.endpoint(`assinados`), { params: this.toParams({ page, pageSize }) })
      .pipe(map(e => this.enhance(e)), share());
  };

  /**
   *
   */
  getAllRefusedByMe = (page: number, pageSize: number): Observable<Document[]> => {
    return this.http
      .get<Document[]>(this.endpoint(`recusados`), { params: this.toParams({ page, pageSize }) })
      .pipe(map(e => this.enhance(e)), share());
  };

  /**
   *
   */
  getAllCapturedByMe = (page: number, pageSize: number): Observable<Document[]> => {
    return this.http
      .get<Document[]>(this.endpoint(`capturados`), { params: this.toParams({ page, pageSize }) })
      .pipe(map(e => this.enhance(e)), share());
  };

  /**
   *
   */
  getDetails = (id: ID): Observable<Document> => {
    return this.http.get<Document>(this.endpoint(`${id}`)).pipe(share());
  };

  /**
   *
   */
  sign = (id: ID): Observable<void> => {
    return this.http.post<void>(this.endpoint(`${id}/assinar`), {}).pipe(share());
  };

  /**
   *
   */
  refuse = (id: ID): Observable<void> => {
    return this.http.post<void>(this.endpoint(`${id}/recusar`), {}).pipe(share());
  };

  /**
   *
   */
  block = (id: ID): Observable<void> => {
    return this.http.post<void>(this.endpoint(`${id}/bloquear`), {}).pipe(share());
  };

  /**
   *
   */
  unblock = (id: ID): Observable<void> => {
    return this.http.post<void>(this.endpoint(`${id}/desbloquear`), {}).pipe(share());
  };

  /**
   *
   */
  generateUrl = (id: ID): Observable<string> => {
    return this.http.get<string>(this.endpoint(`${id}/download`), {}).pipe(share());
  };
}
