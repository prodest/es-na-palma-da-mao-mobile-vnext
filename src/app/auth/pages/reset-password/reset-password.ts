import { Component } from '@angular/core';
import { IonicPage, ToastController } from 'ionic-angular/umd';
import { AcessoCidadaoService } from '@espm/core/auth/acesso-cidadao.service';

@IonicPage()
@Component({
  selector: 'reset-password',
  templateUrl: 'login.html'
})
export class ResetPasswordPage {
  /**
   *
   */
  username: string | undefined;
  readonly errorMsgs = {
    accountNotLinked: 'User not found.' // Verification message with AcessoCidadao
  };

  /**
   * Creates an instance of LoginPage.
   */
  constructor(
    private auth: AcessoCidadaoService,
    private toastCtrl: ToastController
  ) { }

  /**
   * Executa login na aplicação de acordo com as configurações do settings, usuário e senha.
   */
  resetPassword = (username?: string) => {
    if (!username) {
      this.toastCtrl.create({ message: 'Informe CPF ou Email' }).present();
      return;
    }
    this.auth.resetPassword(this.username);
  };
}