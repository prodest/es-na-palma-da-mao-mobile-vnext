import { Injectable } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';

import { Edition, SearchFilter, SearchResult } from './../model';
import { DioApiService } from './dio-api.service';

// import { of } from 'rxjs/observable/of'
// import { _throw } from 'rxjs/observable/throw'
/**
 *
 *
 */
@Injectable()
export class DioService {
  loading: Loading;
  /**
   *
   *
   */
  constructor(private api: DioApiService, private loadingCtrl: LoadingController) {}

  /**
   *
   *
   */
  getLatestEditions(): Observable<Edition[]> {
    this.showLoading();
    return this.api.getLatestEditions().pipe(finalize(() => this.dismissLoading()));
  }

  /**
   *
   *
   */
  search(filter: SearchFilter): Observable<SearchResult> {
    this.showLoading();
    return this.api.search(filter).pipe(finalize(() => this.dismissLoading()));
  }

  /**
   *
   */
  private showLoading = (message: string = 'Aguarde') => {
    if (this.loading) {
      this.loading.setContent(message);
    } else {
      this.loading = this.loadingCtrl.create({ content: message, dismissOnPageChange: true });
      this.loading.present();
    }
  };

  /**
   *
   */
  private dismissLoading = () => {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  };
}
