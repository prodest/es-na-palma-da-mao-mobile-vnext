import { Component } from '@angular/core';
import { IonicPage, ToastController } from 'ionic-angular';
import { AcessoCidadaoService } from '@espm/core/auth/acesso-cidadao.service';

@IonicPage()
@Component({
  selector: 'validate-cpf',
  templateUrl: 'login.html'
})
export class ValidateCPFPage {
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
  validatePassword = (username?: string) => {
    if (!username) {
      this.toastCtrl.create({ message: 'Informe CPF ou Email' }).present();
      return;
    }
    this.auth.resetPassword(this.username);
  };
}