import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { Environment, EnvVariables, Pagination } from '@espm/core';
import { Observable } from 'rxjs/Observable';
import { share } from 'rxjs/operators';

import { Document } from './documents.model';

/**
 *
 *
 */
@Injectable()
export class DocumentsApiService {
  /**
   *
   *
   */
  constructor(private http: HttpClient, @Inject(EnvVariables) private env: Environment) {}

  /**
   *
   */
  getAllWaitingForMySignature = (pagination: Pagination): Observable<Document[]> => {
    return this.http
      .get<Document[]>(`${this.env.api.edocs}/documento/fase-assinatura/aguardando`, {
        params: new HttpParams()
          .set('page', pagination.pageNumber.toString())
          .set('pageSize', pagination.pageSize.toString())
      })
      .pipe(share());
  };

  /**
   *
   */
  getSignedByMe = (pagination: Pagination): Observable<Document[]> => {
    return this.http
      .get<Document[]>(`${this.env.api.edocs}/documento/fase-assinatura/assinados`, {
        params: new HttpParams()
          .set('page', pagination.pageNumber.toString())
          .set('pageSize', pagination.pageSize.toString())
      })
      .pipe(share());
  };

  /**
   *
   */
  getRefusedByMe = (pagination: Pagination): Observable<Document[]> => {
    return this.http
      .get<Document[]>(`${this.env.api.edocs}/documento/fase-assinatura/recusados`, {
        params: new HttpParams()
          .set('page', pagination.pageNumber.toString())
          .set('pageSize', pagination.pageSize.toString())
      })
      .pipe(share());
  };

  /**
   *
   */
  getCapturedByMe = (pagination: Pagination): Observable<Document[]> => {
    return this.http
      .get<Document[]>(`${this.env.api.edocs}/documento/fase-assinatura/capturados`, {
        params: new HttpParams()
          .set('page', pagination.pageNumber.toString())
          .set('pageSize', pagination.pageSize.toString())
      })
      .pipe(share());
  };

  /**
   *
   */
  getDetails = (id: ID): Observable<Document> => {
    return this.http.get<Document>(`${this.env.api.edocs}/documento/fase-assinatura/${id}`).pipe(share());
  };

  // /**
  //  *
  //  */
  // download = (document: Document): Observable<void> => {
  //   return this.http.get<void>(`${this.env.api.edocs}/documento/fase-assinatura/${document.id}/assinar`, {}).pipe(share());
  // };

  /**
   *
   */
  sign = (id: ID): Observable<void> => {
    return this.http.post<void>(`${this.env.api.edocs}/documento/fase-assinatura/${id}/assinar`, {}).pipe(share());
  };

  /**
   *
   */
  refuse = (id: ID): Observable<void> => {
    return this.http.post<void>(`${this.env.api.edocs}/documento/fase-assinatura/${id}/recusar`, {}).pipe(share());
  };

  /**
   *
   */
  block = (id: ID): Observable<void> => {
    return this.http.post<void>(`${this.env.api.edocs}/documento/fase-assinatura/${id}/bloquear`, {}).pipe(share());
  };

  /**
   *
   */
  unblock = (id: ID): Observable<void> => {
    return this.http.post<void>(`${this.env.api.edocs}/documento/fase-assinatura/${id}/desbloquear`, {}).pipe(share());
  };
}
