import { Injectable } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
// import { of } from 'rxjs/observable/of'
// import { _throw } from 'rxjs/observable/throw'
import { finalize } from 'rxjs/operators';

import { DioApiService } from './dio-api.service';
import { Edition } from './../model';

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
  constructor(
    private api: DioApiService,
    // private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  public getLatestEditions(): Observable<Edition[]> {
    this.showLoading();
    return this.api.getLatestEditions().pipe(finalize(this.dismissLoading));
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
