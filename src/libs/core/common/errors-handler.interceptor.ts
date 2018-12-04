import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { catchError } from 'rxjs/operators';

const SHOW_ERROR_HEADER = 'showError';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  /**
   * Creates an instance of ErrorHandlerInterceptor.
   */
  constructor(private toastCtrl: ToastController) {}

  /**
   *
   *
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const showError = req.headers.has(SHOW_ERROR_HEADER) ? req.headers.get(SHOW_ERROR_HEADER) === 'true' : true;

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse | any) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          return _throw(err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          let message: string = 'Ocorreu um erro inesperado!';
          let body: any;

          try {
            body = JSON.parse(err.error);
          } catch (error) {
            body = err.error;
          }

          // todo: ajustar lógica
          if (err.status === 422) {
            const firstError = Object.keys(body.errors).shift();
            message = `${body.errors[firstError].join(' ')}`;
          } else {
            if (typeof body === 'string') {
              message = body;
            } else if (body && body.message) {
              message = body.message;
            } else if (body && body.error_description) {
              message = body.error_description;
            } else if (body && body.error) {
              message = body.error;
            }
          }

          const error = { status: err.status, message };
          showError && this.showError(error);
          return _throw(error);
        }
      })
    );
  }

  /**
   *
   */
  private showError = error => {
    let toast = this.toastCtrl.create({
      message: error.message,
      duration: 5000
    });
    toast.present();
  };
}

export const ErrorHandlerInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorHandlerInterceptor,
  multi: true
};
