import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { trackById, AuthQuery } from '@espm/core';
import { InfiniteScroll, NavController, Refresher, App } from 'ionic-angular';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { filter, tap } from 'rxjs/operators';

import { Document, DocumentsQuery, DocumentsService } from '../../state';
import { ScopeName } from '../../state/documents.store';

@Component({
  selector: 'edocs-document-summary-list',
  templateUrl: 'document-summary-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentSummaryListComponent implements OnChanges, OnInit, OnDestroy {
  documents$: Observable<Document[]>;
  isLoading$: Observable<boolean>;
  hasMore$: Observable<boolean>;
  trackById = trackById;
  @ViewChild(InfiniteScroll) infiniteScroll;
  @ViewChild(Refresher) refresher;
  @Input() title: string;
  @Input() scopeName: ScopeName;

  /**
   *
   */
  constructor(private docsService: DocumentsService, 
    private docsQuery: DocumentsQuery, 
    private navCtrl: NavController, 
    private authQuery: AuthQuery,
    protected appCtrl: App) {}

  /**
   *
   */
  ngOnChanges(changes: SimpleChanges): void {
    if ('scopeName' in changes) {
      this.docsService.setActiveScope(this.scopeName);
    }
  }

  /**
   *
   */
  ngOnInit(): void {
    // permite acesso à tela se autenticados
    const isAllowed = this.authQuery.isLoggedIn;

    if (!isAllowed) {
      this.documents$ = of([]);
      this.hasMore$ = of(false);
      this.isLoading$ = of(false);
      return;
    }
    this.documents$ = this.docsQuery.selectDocuments();
    this.hasMore$ = this.docsQuery.selectHasMore();
    this.isLoading$ = this.docsQuery.selectLoading();

    // completa infiniteScroll e refresher toda vez que terminar de carregar
    this.isLoading$
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
  get isRefreshing(): boolean {
    return this.refresher.state === 'refreshing';
  }

  /**
   *
   */
  refresh = () => {
    this.docsService.refresh();
  };

  /**
   *
   */
  loadFirstPage() {
    this.docsService.loadFirstPage();
  }

  /**
   *
   */
  loadNextPage = () => {
    this.docsService.loadNextPage();
  };

  /**
   *
   */
  sign = (document: Document) => {
    this.docsService.setDocumentAsActive(document);
    this.navCtrl.push('SignDocumentPage');
  };

  /**
   *
   */
  block = (document: Document) => {
    this.docsService.block(document);
  };

  /**
   *
   */
  unblock = (document: Document) => {
    this.docsService.unblock(document);
  };

  /**
   *
   */
  open = (document: Document) => {
    this.docsService.setDocumentAsActive(document);
    this.navCtrl.push('PdfPreviewPage');
  };

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
    this.docsService.refuse(document);
  };

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
