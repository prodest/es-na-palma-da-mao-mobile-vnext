import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { AcessoCidadaoClaims, createAnonymousUser, defaultAvatarSrc, Token } from '../models';

export type AuthState = {
  user: Partial<AcessoCidadaoClaims>;
  accessToken?: Token;
  refreshToken?: any;
  clientId?: string;
  avatarUrl?: string;
};

const initialState: AuthState = {
  user: createAnonymousUser(),
  avatarUrl: defaultAvatarSrc
};

@Injectable()
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {
  /**
   *
   */
  constructor() {
    super(initialState);
  }

  /**
   *
   */
  reset = () => this.update(initialState);
}
