import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { Environment, EnvVariables } from '@espm/core';
import { Observable } from 'rxjs/Observable';
import { map, share } from 'rxjs/operators';

import { ApiBaseService } from './api-base.service';
import { Document, ManifestacaoUsuario } from './documents.model';

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
    try {
      return this.http
        .get<Document[]>(this.endpoint(`aguardando`), { params: this.toParams({ page, pageSize }) })
        .pipe(
          map(e => this.mapDocumentScope(e, ManifestacaoUsuario.NaoSeManifestou)),
          map(e => this.enhance(e)),
          share()
        );
    } catch (error) {
      console.log(error);
      throw new Error('[E-docs] - Erro ao pegar documentos esperando minha assinatura');
    }
  };

  /**
   *
   */
  getAllSignedByMe = (page: number, pageSize: number): Observable<Document[]> => {
    try {
      return this.http
        .get<Document[]>(this.endpoint(`assinados`), { params: this.toParams({ page, pageSize }) })
        .pipe(
          map(e => this.mapDocumentScope(e, ManifestacaoUsuario.Assinado)),
          map(e => this.enhance(e)),
          share()
        );
    } catch (error) {
      console.log(error);
      throw new Error('[E-docs] - Erro ao pegar documentos assinados por mim');
    }
  };

  /**
   *
   */
  getAllRefusedByMe = (page: number, pageSize: number): Observable<Document[]> => {
    try {
      return this.http
        .get<Document[]>(this.endpoint(`recusados`), { params: this.toParams({ page, pageSize }) })
        .pipe(
          map(e => this.mapDocumentScope(e, ManifestacaoUsuario.Recusado)),
          map(e => this.enhance(e)),
          share()
        );
    } catch (error) {
      console.log(error);
      throw new Error('[E-docs] - Erro ao pegar documentos recusados por mim');
    }
  };

  /**
   *
   */
  getAllCapturedByMe = (page: number, pageSize: number): Observable<Document[]> => {
    try {
      return this.http
        .get<Document[]>(this.endpoint(`capturados`), { params: this.toParams({ page, pageSize }) })
        .pipe(
          map(e => this.enhance(e)),
          share()
        );
    } catch (error) {
      console.log(error);
      throw new Error('[E-docs] - Erro ao buscar documentos capturados por mim');
    }
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
  sign = (id: ID): Observable<string> => {
    try {
      return this.http.post<string>(this.endpoint(`${id}/assinar`), {}).pipe(share());
    } catch (error) {
      console.log(error);
      throw new Error('[E-docs] - Erro ao assinar');
    }
  };

  /**
   *
   */
  refuse = (id: ID): Observable<string> => {
    try {
      return this.http.post<string>(this.endpoint(`${id}/recusar`), {}).pipe(share());
    } catch (error) {
      console.log(error);
      throw new Error('[E-docs] - Erro ao recusar documento');
    }
  };

  /**
   *
   */
  block = (id: ID): Observable<void> => {
    try {
      return this.http.post<void>(this.endpoint(`${id}/bloquear`), {}).pipe(share());
    } catch (error) {
      console.log(error);
      throw new Error('[E-docs] - Erro ao bloquear documento');
    }
  };

  /**
   *
   */
  unblock = (id: ID): Observable<void> => {
    try {
      return this.http.post<void>(this.endpoint(`${id}/desbloquear`), {}).pipe(share());
    } catch (error) {
      console.log(error);
      throw new Error('[E-docs] - Erro ao desbloquear documento');
    }
  };

  /**
   *
   */
  generateUrl = (id: ID): Observable<string> => {
    try {
      return this.http.get<string>(this.endpoint(`${id}/download`), {}).pipe(share());
    } catch (error) {
      console.log(error);
      throw new Error('[E-docs] - Erro ao gerar url de download');
    }
  };

  /**
   *
   */
  private mapDocumentScope(documents: Document[], tipoManifestacao: ManifestacaoUsuario): Document[] {
    return documents.map(d => ({ ...d, manifestacaoUsuario: tipoManifestacao }));
  }
}
