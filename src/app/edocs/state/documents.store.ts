import { coerceArray, EntityState, EntityStore, ID, increment, push, StoreConfig } from '@datorama/akita';
import { environment } from '@espm/core';

import { Document, ManifestacaoUsuario } from './documents.model';

export type ScopeName = 'waitingForMySignature' | 'refusedByMe' | 'signedByMe' | 'capturedByMe';

export function add<T>(arr: T[], items: T | T[]): T[] {
  let result: T[] = [...arr];
  coerceArray(items).forEach((item: T) => {
    if (result.indexOf(item) <= -1) {
      result = push(result, item);
    }
  });
  return result;
}

export function remove<T>(arr: T[], item: T) {
  return arr.filter(current => item !== current);
}

export type Scope = {
  hasMore: boolean;
  firstPage: number;
  currentPage?: number;
  nextPage?: number;
  pageSize: number;
  documentsIds: ID[];
};

const defaultScope = {
  hasMore: true,
  firstPage: environment.pagination.pageNumber + 1, // todo até resolve no env, pois é usado em outros módulos
  currentPage: null,
  nextPage: increment(environment.pagination.pageNumber),
  pageSize: environment.pagination.pageSize,
  documentsIds: []
};

export interface DocumentsState extends EntityState<Document> {
  waitingForMySignature: Scope;
  refusedByMe: Scope;
  signedByMe: Scope;
  capturedByMe: Scope;
  activeScopeName: ScopeName;
}

const initialValue: DocumentsState = {
  waitingForMySignature: defaultScope,
  refusedByMe: defaultScope,
  signedByMe: defaultScope,
  capturedByMe: defaultScope,
  activeScopeName: 'waitingForMySignature'
};

@StoreConfig({ name: 'edocs-documents' })
export class DocumentsStore extends EntityStore<DocumentsState, Document> {
  /**
   *
   *
   */
  constructor() {
    super(initialValue);
  }

  /**
   *
   *
   */
  setActiveScope = (scope: ScopeName) => {
    this.updateRoot({ activeScopeName: scope });
  };

  // /**
  //  *
  //  *
  //  */
  // removeDocumentId = (id: ID) => {
  //   this.updateRoot((state: DocumentsState) => {
  //     const scope = state[state.activeScopeName];
  //     return {
  //       [state.activeScopeName]: {
  //         ...scope,
  //         documentsIds: remove(scope.documentsIds, id)
  //       }
  //     };
  //   });
  // };

  // /**
  //  *
  //  *
  //  */
  // addDocumentIds = (ids: ID[]) => {
  //   this.updateRoot((state: DocumentsState) => {
  //     const scope = state[state.activeScopeName];
  //     return {
  //       [state.activeScopeName]: {
  //         ...scope,
  //         documentsIds: add(scope.documentsIds, ids)
  //       }
  //     };
  //   });
  // };

  /**
   *
   *
   */
  addOrUpdate = (docs: Document[]) => {
    docs.forEach(doc => this.upsert(doc.id, doc));
  };

  /**
   *
   *
   */
  sign = (id: ID) => {
    this.update(id, { manifestacaoUsuario: ManifestacaoUsuario.Assinado });
  };

  /**
   *
   *
   */
  refuse = (id: ID) => {
    this.update(id, { manifestacaoUsuario: ManifestacaoUsuario.Recusado });
  };

  /**
   *
   *
   */
  undoManifestation = (id: ID) => {
    this.update(id, { manifestacaoUsuario: ManifestacaoUsuario.NaoSeManifestou });
  };

  /**
   *
   *
   */
  block = (id: ID) => {
    this.update(id, { isBloqueadoParaAssinaturas: true });
  };

  /**
   *
   *
   */
  unblock = (id: ID) => {
    this.update(id, { isBloqueadoParaAssinaturas: false });
  };

  /**
   *
   *
   */
  updateScope(changes: Partial<Scope>) {
    this.updateRoot((state: DocumentsState) => {
      const scope = state[state.activeScopeName];
      return {
        [state.activeScopeName]: { ...scope, ...changes }
      };
    });
  }
}
