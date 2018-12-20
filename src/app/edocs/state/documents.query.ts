import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Pagination } from '@espm/core';

import { Document } from './documents.model';
import { DocumentsState, DocumentsStore } from './documents.store';

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
  selectHasMore = () => {
    return this.select(state => state.hasMore);
  };

  /**
   *
   */
  getHasMore() {
    return this.getSnapshot().hasMore;
  }

  /**
   *
   */
  getFirstPage() {
    return this.getSnapshot().firstPage;
  }

  /**
   *
   */
  getCurrentPage() {
    return this.getSnapshot().currentPage;
  }

  /**
   *
   */
  getNextPage() {
    return this.getSnapshot().nextPage;
  }

  /**
   *
   */
  getPageSize() {
    return this.getSnapshot().pageSize;
  }

  /**
   *
   */
  getPagination(): Pagination {
    const { pageSize, currentPage } = this.getSnapshot();
    return { pageSize, pageNumber: currentPage };
  }
}
