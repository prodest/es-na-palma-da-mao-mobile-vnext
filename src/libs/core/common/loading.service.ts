import { Injectable } from '@angular/core';
import { Loading, LoadingController, LoadingOptions, NavOptions } from 'ionic-angular';

@Injectable()
export class LoadingService {
  /**
   * Creates an instance of LoadingService.
   */
  constructor(private loadingCtrl: LoadingController) {}

  /**
   * Exibe o loading com delay
   *
   */
  show(opts: LoadingOptions | string, delay: number = 330): Loading {
    let loading = this.loadingCtrl.create(typeof opts === 'string' ? { content: opts } : { ...opts });

    this.patchDismissMethod(loading);

    this.showAfterDelay(loading, delay);

    return loading;
  }

  /**
   * Aplica monkey patching ao método dismiss do loading do ionic para adicionar delay na exibição
   *
   */
  private patchDismissMethod = (loading: Loading) => {
    let originalDismiss = loading.dismiss;

    loading.dismiss = (data?: any, role?: string, navOptions?: NavOptions): Promise<any> => {
      this.clearDelayTimer(loading);

      let promise = originalDismiss.call(loading, data, role, navOptions).catch(error => {
        console.error(`[${this.constructor.name}] => loading.dismiss error: ${error}`);
      });

      return promise
        .then(() => {
          loading = undefined;
          originalDismiss = null;
        })
        .catch(() => {
          loading = undefined;
          originalDismiss = null;
        });
    };
  };

  /**
   *
   *
   */
  private clearDelayTimer = (loading: Loading) => {
    if ((loading as any).__timer) {
      clearTimeout((loading as any).__timer);
      (loading as any).__timer = null;
    }
  };

  /**
   *
   *
   */
  private showAfterDelay = (loading: Loading, delay: number) => {
    (loading as any).__timer = setTimeout(() => {
      loading.present().then(() => {
        this.clearDelayTimer(loading);
      });
    }, delay);
  };
}
