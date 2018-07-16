import { Injectable } from '@angular/core';
import { AuthService } from '@espm/core/auth';
import { Loading, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { catchError, finalize, flatMap } from 'rxjs/operators';

import { DriverLicense, DriverStatus, Ticket } from '../model';
import { DetranApiService } from './detran-api.service';

/**
 *
 *
 */
@Injectable()
export class DriverService {
  loading: Loading;

  /**
   *
   *
   */
  constructor(private auth: AuthService, private api: DetranApiService, private loadingCtrl: LoadingController) {}

  /**
   *
   *
   */
  saveCNH = (cnh: DriverLicense) => {
    // a CNH atual do usuário
    const currentCNH = this.auth.user.cnhNumero
      ? {
          registerNumber: this.auth.user.cnhNumero,
          ballot: this.auth.user.cnhCedula
        }
      : null;

    this.showLoading();

    // Por enquanto a validação só pode ser feita depois de salvar
    // os dados.
    // Obs: aguardando essa validação no acesso cidadão
    return this.api.saveCNH(cnh).pipe(
      flatMap(this.validateCNH),
      flatMap(() => this.auth.refreshUser()), // sincroniza com acesso cidadão
      finalize(this.dismissLoading),
      catchError(error => {
        // se deu erro ao salvar carteira e usuário já tinha uma carteira válida
        // antes da atualização, então faz o rollback do salvamento com um novo salvamento
        // usando valores válidos anteriores ao update não validado

        if (error.message === 'Não existe condutor no ES com os dados informados.') {
          if (currentCNH) {
            return this.saveCNH(currentCNH).pipe(flatMap(() => _throw(error)));
          } else {
            return _throw(error);
          }
        }
        return _throw(error);
      })
    );
  };

  /**
   *
   *
   */
  getDriverStatus = (): Observable<DriverStatus> => {
    this.showLoading('Carregando dados da CNH');
    return this.api.getDriverStatus().pipe(finalize(this.dismissLoading));
  };

  /**
   *
   *
   */
  getDriverTickets = (): Observable<Ticket[]> => {
    this.showLoading('Carregando multas');
    return this.api.getDriverTickets().pipe(finalize(this.dismissLoading));
  };

  /**
   * Tenta buscar os dados do condutor com a cnh cadastrada. Se não conseguir
   * a CNH possívelmente está inválida
   *
   */
  private validateCNH = () => this.api.getDriverStatus();

  /**
   *
   *
   */
  private showLoading = (message: string = 'Aguarde') => {
    if (this.loading) {
      this.loading.setContent(message);
    } else {
      this.loading = this.loadingCtrl.create({ content: message, dismissOnPageChange: true });
      this.loading.present();
    }
  };

  /**
   *
   *
   */
  private dismissLoading = () => {
    if (this.loading) {
      this.loading.dismiss().catch(console.log);
      this.loading = null;
    }
  };
}
