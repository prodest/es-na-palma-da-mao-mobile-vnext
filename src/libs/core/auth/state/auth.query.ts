import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { map } from 'rxjs/operators';

import { JwtHelper } from '../jwt-helper';
import { Token } from '../models';
import { AuthState, AuthStore } from './auth.store';

@Injectable()
export class AuthQuery extends Query<AuthState> {
  isLoggedIn$ = this.select(auth => auth.accessToken).pipe(map(token => this.isValid(token)));
  loginExpirationDate$ = this.select(auth => auth.accessToken).pipe(map(token => this.getExpirationDate(token)));
  user$ = this.select(auth => auth.user);

  /**
   *
   */
  get state(): AuthState {
    return this.getSnapshot();
  }

  /**
   *
   */
  get isLoggedIn(): boolean {
    return this.state.accessToken && this.isValid(this.state.accessToken);
  }

  /**
   *
   */
  constructor(protected store: AuthStore, private jwt: JwtHelper) {
    super(store);
  }

  /**
   *
   */
  private isValid = (token: Token): boolean => !!token && !this.jwt.isTokenExpired(token);

  /**
   *
   */
  private getExpirationDate = (token: Token): Date => this.jwt.getTokenExpirationDate(token);
}
