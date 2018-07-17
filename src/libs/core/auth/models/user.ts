import { AcessoCidadaoClaims } from './claims/acessoCidadaoClaims';

// import { ID } from '@datorama/akita';

export const defaultAvatarSrc = './assets/imgs/user.png';

// export interface User extends AcessoCidadaoClaims {
//   avatarUrl: string;
// }

// export type Credentials = {
//   user: string;
//   password: string;
// };

// export function createUser(claims: AcessoCidadaoClaims): Partial<User> {
//   return {
//     ...claims,
//     avatarUrl: defaultAvatarSrc
//   };
// }

export function createAnonymousUser(): Partial<AcessoCidadaoClaims> {
  return {
    nome: 'Usuário visitante'
  };
}
