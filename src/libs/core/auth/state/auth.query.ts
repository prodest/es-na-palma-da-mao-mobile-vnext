import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { map } from 'rxjs/operators';

import { JwtHelper } from '../jwt-helper';
import { Token } from '../models';
import { AuthState, AuthStore } from './auth.store';

@Injectable()
export class AuthQuery extends Query<AuthState> {
  user$ = this.select(auth => auth.user);
  accessToken$ = this.select(auth => auth.accessToken);
  isLoggedIn$ = this.accessToken$.pipe(map(token => this.isValid(token)));

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
    return this.isValid(this.state.accessToken);
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
  private isValid = (token: Token | null): boolean => token && !this.jwt.isTokenExpired(token);
}
