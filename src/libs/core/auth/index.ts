import { AcessoCidadaoApiService } from './acesso-cidadao-api.service';
import { AcessoCidadaoService } from './acesso-cidadao.service';
import { AuthService } from './auth.service';
import { AuthNeededService } from './auth-needed.service';
import { JwtHelper } from './jwt-helper';
import { JwtInterceptorProvider } from './jwt.interceptor';
import { AuthQuery, AuthStore } from './state';

export * from './auth.service';
export * from './models';
export * from './auth-needed.service';
export { AuthQuery } from './state';

export const ANONYMOUS_HEADER = 'anonymous';

export const Auth = [
  AcessoCidadaoApiService,
  AcessoCidadaoService,
  AuthService,
  AuthNeededService,
  JwtHelper,
  JwtInterceptorProvider,
  AuthQuery,
  AuthStore
];
