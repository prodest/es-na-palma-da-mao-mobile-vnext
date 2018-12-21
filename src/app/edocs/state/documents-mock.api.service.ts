import { Injectable } from '@angular/core';
import { guid, ID } from '@datorama/akita';
import { environment, Pagination } from '@espm/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';

import { Document, ManifestacaoUsuario } from './documents.model';

export type PageFactory = (pageNumber: number, pageSize: number) => any[];

const createDocument = (i: number, manifestacao: ManifestacaoUsuario) => {
  return {
    id: guid(),
    nome: `${ManifestacaoUsuario[manifestacao]} - ${i}`,
    papelAssinatura: 'ANALISTA DE TECNOLOGIA DA INFORMACAO - PRODEST - SGPRJ',
    dataEnvio: new Date().getTime().toString(),
    dataEnvioLabel: '18/12/2018 11:53',
    paginas: 2,
    bytes: 104056,
    tamanho: '104,56 KB',
    isBloqueadoParaAssinaturas: false,
    isCapturadoPorMim: false,
    qtdeAssinados: 0,
    qtdeRecusas: 0,
    qtdeFaltaAssinar: 0,
    soFaltaOUsuarioSeManifestar: true,
    manifestacaoUsuario: manifestacao,
    capturador: {
      id: i,
      nome: 'VINICIUS SALOMAO BARBOSA (ANALISTA DE TECNOLOGIA DA INFORMACAO - PRODEST - SGPRJ)'
    }
  };
};
const createWaitingForMySignature = (i: number) => createDocument(i, ManifestacaoUsuario.NaoSeManifestou);
const createRefusedByMe = (i: number) => createDocument(i, ManifestacaoUsuario.Recusado);
const createSignedByMe = (i: number) => createDocument(i, ManifestacaoUsuario.Assinado);

function seedWith(factory: (i: number) => Document) {
  return function(pageNumber, pageSize): Document[] {
    let data = [];
    const offset = pageNumber * pageSize + 1;
    for (let i = offset; i < offset + pageSize; i++) {
      data.push(factory(i));
    }

    return data;
  };
}

const paginatorFactory = genFunction => {
  // cria o generator
  const gen = genFunction();

  // inicia o generator (retorna { value: undefined} e pausa no primeiro yield)
  gen.next();

  /**
   * Função para enviar valores ao generator
   */
  function next(pagination: Pagination) {
    return gen.next(pagination);
  }
  return {
    paginate: next
  };
};

/**
 *
 *
 */
const createPaginator = (defaultPageNumber: number, defaultPageSize: number, maxPages, factory: PageFactory) => {
  return paginatorFactory(function*() {
    let _pageNumber = defaultPageNumber;
    let _pageSize = defaultPageSize;
    let i = 0;
    while (i++ < maxPages) {
      const { pageNumber = _pageNumber, pageSize = _pageSize } = yield factory(_pageNumber, _pageSize);
      _pageNumber = pageNumber;
      _pageSize = pageSize;
    }
  });
};

let paginator;

/**
 *
 *
 */
@Injectable()
export class DocumentsMockApiService {
  /**
   *
   */
  getAllWaitingForMySignature = (pagination: Pagination): Observable<Document[]> => {
    if (pagination.pageNumber === environment.pagination.pageNumber) {
      paginator = createPaginator(0, environment.pagination.pageSize, 10, seedWith(createWaitingForMySignature));
    }
    const docs = paginator.paginate({ pageNumber: pagination.pageNumber });
    return of(docs.value).pipe(delay(200));
  };

  /**
   *
   */
  getAllSignedByMe = (pagination: Pagination): Observable<Document[]> => {
    if (pagination.pageNumber === environment.pagination.pageNumber) {
      paginator = createPaginator(0, environment.pagination.pageSize, 10, seedWith(createSignedByMe));
    }
    const docs = paginator.paginate({ pageNumber: pagination.pageNumber });
    return of(docs.value).pipe(delay(200));
  };

  /**
   *
   */
  getAllRefusedByMe = (pagination: Pagination): Observable<Document[]> => {
    if (pagination.pageNumber === environment.pagination.pageNumber) {
      paginator = createPaginator(0, environment.pagination.pageSize, 10, seedWith(createRefusedByMe));
    }
    const docs = paginator.paginate({ pageNumber: pagination.pageNumber });
    return of(docs.value).pipe(delay(200));
  };

  /**
   *
   */
  getAllCapturedByMe = (pagination: Pagination): Observable<Document[]> => {
    return null;
  };

  /**
   *
   */
  getDetails = (id: ID): Observable<Document> => {
    return null;
  };

  /**
   *
   */
  sign = (id: ID): Observable<void> => {
    return null;
  };

  /**
   *
   */
  refuse = (id: ID): Observable<void> => {
    return null;
  };

  /**
   *
   */
  block = (id: ID): Observable<void> => {
    return null;
  };

  /**
   *
   */
  unblock = (id: ID): Observable<void> => {
    return null;
  };
}
