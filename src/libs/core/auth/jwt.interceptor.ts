import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { flatMap } from 'rxjs/operators';

import { ANONYMOUS_HEADER } from '.';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  /**
   *
   *
   */
  private auth: AuthService;

  /**
   *
   */
  constructor(private injector: Injector) {}

  /**
   *
   *
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // work-around. ref: https://github.com/angular/angular/issues/18224#issuecomment-316969816
    this.auth = this.injector.get(AuthService);

    const isAnonymousRequest = req.headers.has(ANONYMOUS_HEADER) && req.headers.get(ANONYMOUS_HEADER) === 'true';

    // Clone the request to add the new header.
    return isAnonymousRequest ? this.createAnonymousRequest(req, next) : this.createAuthRequest(req, next);
  }

  /**
   *
   *
   */
  protected createAuthRequest(req: HttpRequest<any>, next: HttpHandler) {
    return this.auth
      .refreshAccessTokenIfNeeded()
      .pipe(flatMap(token => next.handle(req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) }))));
  }

  /**
   *
   *
   */
  protected createAnonymousRequest(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req.clone({ headers: req.headers.delete(ANONYMOUS_HEADER) }));
  }
}

export const JwtInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true
};
