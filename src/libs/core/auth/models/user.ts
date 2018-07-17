import { AcessoCidadaoClaims } from './claims/acessoCidadaoClaims';

export const defaultAvatarSrc = 'assets/imgs/user.png';

export function createAnonymousUser(): Partial<AcessoCidadaoClaims> {
  return {
    nome: 'Usuário visitante'
  };
}
