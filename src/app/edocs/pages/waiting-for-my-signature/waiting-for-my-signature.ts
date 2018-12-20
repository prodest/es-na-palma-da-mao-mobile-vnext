import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { trackById } from '@espm/core';
import { InfiniteScroll, IonicPage, Refresher } from 'ionic-angular';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs/Observable';
import { filter, tap } from 'rxjs/operators';

import { Document, DocumentsQuery, DocumentsService } from '../../state';

@IonicPage({
  segment: 'aguardando-minha-assinatura'
})
@Component({
  selector: 'waiting-for-my-signature',
  templateUrl: './waiting-for-my-signature.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class WaitingForMySignaturePage implements OnInit, OnDestroy {
  documents$: Observable<Document[]>;
  isLoading$: Observable<boolean>;
  hasMore$: Observable<boolean>;
  trackById = trackById;
  @ViewChild(InfiniteScroll) infiniteScroll;
  @ViewChild(Refresher) refresher;

  /**
   *
   */
  constructor(private documents: DocumentsService, private docsQuery: DocumentsQuery) {}

  /**
   *
   */
  ngOnInit(): void {
    this.documents$ = this.docsQuery.selectAll();
    this.hasMore$ = this.docsQuery.selectHasMore();

    // completa infiniteScroll e refresher toda vez que terminar de carregar
    this.docsQuery
      .selectLoading()
      .pipe(
        filter(isLoading => !isLoading),
        tap(this.completeInfiniteScroll),
        tap(this.completeRefresher),
        untilDestroyed(this)
      )
      .subscribe();

    this.loadFirstPage();
  }

  /**
   *
   */
  ngOnDestroy() {
    // !important: @ngx-take-until-destroy => This method must be present, even if empty.
  }

  /**
   *
   */
  loadFirstPage() {
    this.getDocuments(this.docsQuery.getFirstPage());
  }

  /**
   *
   */
  loadNextPage = () => {
    if (this.docsQuery.getHasMore()) {
      this.getDocuments(this.docsQuery.getNextPage());
    }
  };

  /**
   *
   */
  sign = (document: Document) => {
    this.documents.sign(document);
  };

  /**
   *
   */
  block = (document: Document) => {
    this.documents.block(document);
  };

  /**
   *
   */
  unblock = (document: Document) => {
    this.documents.unblock(document);
  };

  /**
   *
   */
  donwload = (document: Document) => {};

  /**
   *
   */
  showDetails = (document: Document) => {
    // this.documents.getDetails(document);
  };

  /**
   *
   */
  refuse = (document: Document) => {
    this.documents.refuse(document);
  };

  /**
   *
   */
  private getDocuments = (pageNumber: number) => this.documents.getAllWaitingForMySignature(pageNumber);

  /**
   *
   */
  private completeInfiniteScroll = () => {
    this.infiniteScroll && this.infiniteScroll.complete();
  };

  /**
   *
   */
  private completeRefresher = () => {
    this.refresher && this.refresher.complete();
  };
}
