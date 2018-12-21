import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { flatMap } from 'rxjs/operators';

import { ANONYMOUS_HEADER } from '.';
import { Environment, EnvVariables } from '../environment';
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
  constructor(private injector: Injector, @Inject(EnvVariables) private environment: Environment) {}

  /**
   *
   *
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // work-around. ref: https://github.com/angular/angular/issues/18224#issuecomment-316969816
    this.auth = this.injector.get(AuthService);

    const isAnonymousRequest = req.headers.has(ANONYMOUS_HEADER) && req.headers.get(ANONYMOUS_HEADER) === 'true';

    // Clone the request to add the new header.
    return isAnonymousRequest
      ? this.createAnonymousRequest(req, next)
      : this.createAuthRequest(req, next, !this.isConnectToken(req.url));
  }

  /**
   *
   *
   */
  protected createAuthRequest(req: HttpRequest<any>, next: HttpHandler, refresToken: boolean = true) {
    const accessToken$ = refresToken ? this.auth.refreshAccessTokenIfNeeded() : this.auth.getAccessToken();

    return accessToken$.pipe(
      flatMap(token =>
        next.handle(token ? req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) }) : req)
      )
    );
  }

  /**
   *
   *
   */
  protected createAnonymousRequest(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req.clone({ headers: req.headers.delete(ANONYMOUS_HEADER) }));
  }

  /** Private Methods */

  private isConnectToken(url: string) {
    return url === `${this.environment.identityServer.url}/connect/token`;
  }
}

export const JwtInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true
};
