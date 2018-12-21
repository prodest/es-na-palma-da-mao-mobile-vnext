import { Injectable } from '@angular/core';
import { increment, transaction } from '@datorama/akita';
import { LoadingService } from '@espm/core';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';

import { DocumentsApiService } from './documents.api.service';
import { Document } from './documents.model';
import { DocumentsQuery } from './documents.query';
import { DocumentsStore, ScopeName } from './documents.store';

export type PageInfo = {
  page: number;
  documents: Document[];
};

const noop = () => {};

// const DEFAULT_FIRST_PAGE = environment.pagination.pageNumber;

@Injectable()
export class DocumentsService {
  /**
   *
   *
   */
  constructor(
    private docsStore: DocumentsStore,
    private docsQuery: DocumentsQuery,
    private loadingService: LoadingService,
    private api: DocumentsApiService // private loading: LoadingService
  ) {}

  /**
   *
   *
   */
  setActiveScope = (scope: ScopeName) => {
    this.docsStore.setActiveScope(scope);
  };

  /**
   * Force loading first page
   */
  refresh = (scope?: ScopeName) => {
    this.loadPage(this.docsQuery.getFirstPage(), scope, true);
  };

  /**
   *
   */
  loadFirstPage = (scope?: ScopeName) => {
    this.loadPage(this.docsQuery.getFirstPage(), scope);
  };

  /**
   *
   */
  loadNextPage = (scope?: ScopeName) => {
    if (this.docsQuery.getHasMore()) {
      this.loadPage(this.docsQuery.getNextPage(), scope);
    }
  };

  /**
   *
   */
  loadPage = (page: number, scope?: ScopeName, force = false) => {
    if (force || this.docsQuery.getCurrentPage() !== page) {
      this.getDocuments(page, scope);
    }
  };

  /**
   *
   */
  getDocuments = (page: number, scope: ScopeName = this.docsQuery.getActiveScopeName()) => {
    if (!scope) {
      throw new Error('[E-docs] - Não foi possível buscar os documentos. Escopo não encontrado');
    }

    switch (scope) {
      case 'waitingForMySignature': {
        this.getAllWaitingForMySignature(page);
        break;
      }
      case 'capturedByMe': {
        this.getAllCapturedByMe(page);
        break;
      }
      case 'refusedByMe': {
        this.getAllRefusedByMe(page);
        break;
      }
      case 'signedByMe': {
        this.getAllSignedByMe(page);
        break;
      }
    }
  };

  /**
   *
   *
   */
  getAllWaitingForMySignature = (page?: number): void => {
    this.setLoading(true);

    this.api
      .getAllWaitingForMySignature(page, this.docsQuery.getPageSize())
      .subscribe(documents => this.updateDocuments(page, documents));
  };

  /**
   *
   *
   */
  getAllCapturedByMe = (page?: number): void => {
    this.setLoading(true);

    this.api
      .getAllCapturedByMe(page, this.docsQuery.getPageSize())
      .subscribe(documents => this.updateDocuments(page, documents));
  };

  /**
   *
   *
   */
  getAllSignedByMe = (page?: number): void => {
    this.setLoading(true);

    this.api
      .getAllSignedByMe(page, this.docsQuery.getPageSize())
      .subscribe(documents => this.updateDocuments(page, documents));
  };

  /**
   *
   *
   */
  getAllRefusedByMe = (page?: number): void => {
    this.setLoading(true);

    this.api
      .getAllRefusedByMe(page, this.docsQuery.getPageSize())
      .subscribe(documents => this.updateDocuments(page, documents));
  };

  /**
   *
   *
   */
  @transaction()
  private updateDocuments(page: number, documents: Document[] = []) {
    // se for a primeira página limpa a store e salva somente a primeira página, senão adiciona página ao final
    // pagination.pageNumber === DEFAULT_FIRST_PAGE ? this.docsStore.set(documents) : this.docsStore.add(documents);

    this.docsStore.addOrUpdate(documents);

    // existe mais enquanto quantidade retornada é igual à tam da página
    const hasMore = documents.length >= this.docsQuery.getPageSize();

    this.docsStore.updateScope({
      hasMore,
      currentPage: page,
      nextPage: hasMore ? increment(page) : null
    });

    this.setLoading(false);
  }

  /**
   *
   */
  sign = (document: Document) => {
    // optmistic update
    this.docsStore.sign(document.id);

    this.api.sign(document.id).subscribe(noop, () => this.docsStore.undoManifestation(document.id));
  };

  /**
   *
   */
  refuse = (document: Document) => {
    // optmistic update
    this.docsStore.refuse(document.id);

    this.api.refuse(document.id).subscribe(noop, () => this.docsStore.undoManifestation(document.id));
  };

  /**
   *
   */
  block = (document: Document) => {
    // optmistic update
    this.docsStore.block(document.id);

    this.api.block(document.id).subscribe(noop, () => this.unblock(document));
  };

  /**
   *
   */
  unblock = (document: Document) => {
    // optmistic update
    this.docsStore.unblock(document.id);

    this.api.unblock(document.id).subscribe(noop, () => this.block(document));
  };

  /**
   *
   */
  generateUrl = (document: Document): Observable<string> => {
    const loading = this.loadingService.show('Aguarde', 500);
    return this.api.generateUrl(document.id).pipe(finalize(() => loading.dismiss()));
  };

  /**
   *
   */
  getDetails = (document: Document) => {
    this.setLoading(true);
    this.api.getDetails(document.id).subscribe((detailed: Document) => this.docsStore.upsert(detailed.id, detailed));
  };

  /**
   *
   *
   */
  private setLoading = (isLoading: boolean) => {
    this.docsStore.setLoading(isLoading);
  };
}
