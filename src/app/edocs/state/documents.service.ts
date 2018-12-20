import { Injectable } from '@angular/core';
import { increment, transaction } from '@datorama/akita';
import { environment, Pagination } from '@espm/core';
import { Loading } from 'ionic-angular';
import { finalize } from 'rxjs/operators';

import { DocumentsApiService } from './documents.api.service';
import { Document } from './documents.model';
import { DocumentsQuery } from './documents.query';
import { DocumentsStore } from './documents.store';

export type PageInfo = {
  pagination: Pagination;
  documents: Document[];
};

const DEFAULT_FIRST_PAGE = environment.pagination.pageNumber;

@Injectable()
export class DocumentsService {
  loading: Loading;

  /**
   *
   *
   */
  constructor(
    private docsStore: DocumentsStore,
    private docsQuery: DocumentsQuery,
    private api: DocumentsApiService // private loadingCtrl: LoadingController
  ) {}

  /**
   *
   *
   */
  getAllWaitingForMySignature = (pageNumber?: number): void => {
    this.setLoading(true);

    const pagination = { pageSize: this.docsQuery.getPageSize(), pageNumber };

    this.api.getAllWaitingForMySignature(pagination).subscribe(documents => this.updateDocuments({ pagination, documents }));
  };

  /**
   *
   *
   */
  @transaction()
  private updateDocuments({ pagination, documents = [] }: PageInfo) {
    // se for a primeira página limpa a store e salva somente a primeira página, senão adiciona página ao final
    pagination.pageNumber === DEFAULT_FIRST_PAGE ? this.docsStore.set(documents) : this.docsStore.add(documents);

    // existe mais enquanto quantidade retornada é igual à tam da página
    const hasMore = documents.length >= pagination.pageSize;

    this.docsStore.updatePagination({
      hasMore,
      currentPage: pagination.pageNumber,
      nextPage: hasMore ? increment(pagination.pageNumber) : null
    });

    this.setLoading(false);
  }

  /**
   *
   */
  sign = (document: Document) => {
    this.setLoading(true);
    this.api
      .sign(document.id)
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe(() => this.docsStore.remove(document.id));
  };

  /**
   *
   */
  block = (document: Document) => {
    this.setLoading(true);
    this.api
      .block(document.id)
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe(() => this.docsStore.update(document.id, { isBloqueadoParaAssinaturas: true }));
  };

  /**
   *
   */
  unblock = (document: Document) => {
    this.setLoading(true);
    this.api
      .unblock(document.id)
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe(() => this.docsStore.update(document.id, { isBloqueadoParaAssinaturas: false }));
  };

  /**
   *
   */
  donwload = (document: Document) => {};

  /**
   *
   */
  getDetails = (document: Document) => {
    this.setLoading(true);
    this.api
      .getDetails(document.id)
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe((detailed: Document) => this.docsStore.upsert(detailed.id, detailed));
  };

  /**
   *
   */
  refuse = (document: Document) => {
    this.setLoading(true);
    this.api
      .refuse(document.id)
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe(() => this.docsStore.remove(document.id));
  };

  /**
   *
   *
   */
  private setLoading = (isLoading: boolean) => {
    this.docsStore.setLoading(isLoading);
  };
}
