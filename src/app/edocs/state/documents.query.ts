import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Pagination } from '@espm/core';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map } from 'rxjs/operators';

import { Document, ManifestacaoUsuario } from './documents.model';
import { DocumentsState, DocumentsStore, Scope, ScopeName } from './documents.store';

const filterDocumentsByScope = (scope: ScopeName, documents: Document[]) => {
  switch (scope) {
    case 'waitingForMySignature':
      return documents.filter(doc => doc.manifestacaoUsuario === ManifestacaoUsuario.NaoSeManifestou);
    case 'refusedByMe':
      return documents.filter(doc => doc.manifestacaoUsuario === ManifestacaoUsuario.Recusado);
    case 'signedByMe':
      return documents.filter(doc => doc.manifestacaoUsuario === ManifestacaoUsuario.Assinado);
    case 'capturedByMe':
      return documents.filter(doc => doc.isCapturadoPorMim);
  }
};

@Injectable()
export class DocumentsQuery extends QueryEntity<DocumentsState, Document> {
  /**
   *
   */
  constructor(protected store: DocumentsStore) {
    super(store);
  }

  /**
   *
   */
  selectActiveScopeName(): Observable<ScopeName> {
    return this.select(state => state.activeScopeName);
  }

  /**
   *
   */
  getActiveScopeName(): ScopeName {
    return this.getSnapshot().activeScopeName;
  }

  /**
   *
   */
  getActiveScope(): Scope {
    return this.getSnapshot()[this.getActiveScopeName()];
  }

  /**
   *
   */
  selectDocumentsIds = () => {
    return this.select(state => state[this.getActiveScopeName()].documentsIds);
  };

  /**
   *
   */
  getDocumentsIds = () => {
    return this.getActiveScope().documentsIds;
  };

  /**
   *
   */
  selectDocuments = () => {
    // return this.getDocumentsIds().length ? this.selectMany(this.getDocumentsIds()) : of([]);

    return combineLatest(this.selectActiveScopeName(), this.selectAll()).pipe(
      map(([scope, allDocuments]) => filterDocumentsByScope(scope, allDocuments))
    );
  };

  /**
   *
   */
  selectHasMore = (): Observable<boolean> => {
    return this.select(state => state[this.getActiveScopeName()].hasMore);
  };

  /**
   *
   */
  getHasMore(): boolean {
    return this.getActiveScope().hasMore;
  }

  /**
   *
   */
  getFirstPage(): number {
    return this.getActiveScope().firstPage;
  }

  /**
   *
   */
  getCurrentPage(): number {
    return this.getActiveScope().currentPage;
  }

  /**
   *
   */
  getNextPage(): number | null {
    return this.getActiveScope().nextPage;
  }

  /**
   *
   */
  getPageSize(): number {
    return this.getActiveScope().pageSize;
  }

  /**
   *
   */
  getPagination(): Pagination {
    const { pageSize, currentPage } = this.getActiveScope();
    return { pageSize, pageNumber: currentPage };
  }
}
