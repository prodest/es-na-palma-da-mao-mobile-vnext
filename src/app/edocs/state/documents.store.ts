import { EntityState, EntityStore, increment, StoreConfig } from '@datorama/akita';
import { environment } from '@espm/core';

import { Document } from './documents.model';

export interface DocumentsState extends EntityState<Document> {
  hasMore: boolean;
  firstPage: number;
  currentPage: number;
  nextPage: number;
  pageSize: number;
}

const initialValue: DocumentsState = {
  hasMore: true,
  firstPage: environment.pagination.pageNumber,
  currentPage: environment.pagination.pageNumber,
  nextPage: increment(environment.pagination.pageNumber),
  pageSize: environment.pagination.pageSize
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
  updatePagination(page: { hasMore: boolean; currentPage: number; nextPage?: number; pageSize?: number }) {
    this.updateRoot(page);
  }
}
