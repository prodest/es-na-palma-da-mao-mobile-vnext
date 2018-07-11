import { AcessoCidadaoClaims } from './claims/acessoCidadaoClaims';

const defaultAvatarSrc = './assets/imgs/user.png';

export class User implements AcessoCidadaoClaims {
  public celularValidado: boolean;
  public cpf: string;
  public dateofbirth: string;
  public emailaddress: string;
  public homephone: string;
  public mobilephone: string;
  public nome: string;
  public nomemae: string;
  public nomepai: string;
  public sid: string;
  public sub: number;
  public cnhNumero: string;
  public cnhCedula: string;

  // extra properties
  public anonymous: boolean;
  public avatarUrl: string;

  /**
   *
   *
   */
  public static createNullUser() {
    const user = new User();

    user.nome = 'Usuário visitante';
    user.anonymous = true;
    user.avatarUrl = defaultAvatarSrc;

    return user;
  }

  /**
   *
   *
   */
  public static createFrom(claims: AcessoCidadaoClaims): User {
    return Object.assign(new User(), claims, {
      anonymous: false,
      avatarUrl: defaultAvatarSrc
    });
  }
}
