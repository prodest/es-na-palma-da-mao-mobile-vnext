import { Injectable } from '@angular/core';
import { Toast, ToastController, ToastOptions } from 'ionic-angular';
import merge from 'lodash-es/merge';

export const defaultToastOptions: ToastOptions = {
  duration: 4000,
  showCloseButton: false,
  dismissOnPageChange: false,
  position: 'bottom'
};

@Injectable()
export class ToastService {
  private toast: Toast;

  /**
   *
   *
   */
  constructor(private toastCtrl: ToastController) {}

  /**
   *
   *
   */
  show = (options: ToastOptions | string): Promise<any> => {
    const opts = merge({}, defaultToastOptions, this.normalize(options));
    this.toast = this.toastCtrl.create(opts);
    return this.toast.present();
  };

  /**
   *
   *
   */
  hint = (options: ToastOptions | string) => {
    return this.show(merge({}, { duration: 3000, position: 'middle', cssClass: 'hint' }, this.normalize(options)));
  };

  /**
   *
   *
   */
  dismissAll = () => this.toast && this.toast.instance && this.toast.dismissAll();

  /**
   *
   *
   */
  dismiss = () => this.toast && this.toast.instance && this.toast.dismiss();

  /**
   *
   *
   */
  private normalize = (options: ToastOptions | string): Partial<ToastOptions> => {
    if (typeof options === 'string') {
      return { message: options };
    }
    return options;
  };
}
