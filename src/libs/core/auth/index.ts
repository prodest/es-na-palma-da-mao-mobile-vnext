import { Storage } from '@ionic/storage';

import { AcessoCidadaoService } from './acesso-cidadao.service';
import { AuthStorageModel } from './auth-storage.model';
import { AuthStorage } from './auth-storage.service';
import { AuthService } from './auth.service';
import { JwtHelper } from './jwt-helper';
import { JwtInterceptorProvider } from './jwt.interceptor';
import { User } from './models/user';

export * from './auth-storage.service';
export * from './auth.service';
export * from './models';

export function provideAuthStorage(storage: Storage) {
  const defaults: Partial<AuthStorageModel> = {
    user: User.createNullUser()
  };
  return new AuthStorage(storage, defaults, '_auth-storage');
}

export const ANONYMOUS_HEADER = 'anonymous';

// envronment provider
export const AuthStorageProvider = { provide: AuthStorage, useFactory: provideAuthStorage, deps: [Storage] };

export const Auth = [AcessoCidadaoService, AuthService, JwtHelper, AuthStorageProvider, JwtInterceptorProvider];
