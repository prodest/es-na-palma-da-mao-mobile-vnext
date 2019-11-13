import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, AlertController, App, MenuController } from 'ionic-angular';
import { Denuncia } from '../../model/denuncia';
import { AuthQuery } from '@espm/core';
import { Subject } from 'rxjs/Subject';
import { SeduDenunciasApiService } from '../../providers';
import { Escola } from '../../model/escola';

/**
 * Generated class for the SeduDenunciasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sedu-denuncias',
  templateUrl: 'sedu-denuncias.html',
})
export class SeduDenunciasPage {
  @ViewChild('slides') slides: Slides;

  denuncia: Partial<Denuncia> = {
    autor: "",
    email: "",
    aluno: "",
    codigoEdp: "",
    tipo: 0,
    descricao: "",
    inepEscola: ""
  };

  municipios$: Subject<Array<any>>;               // lista de municípios, obtida pela api, para exibir no select
  tiposDenuncia$: Subject<Array<any>>;            // lista de tipos de denúncias, obtida pela api
  escolas: Array<Escola>;                         // lista de todas as escolas, obtida pela api
  escolasDoMunicipio$: Subject<Array<Escola>>;    // lista de escolas, filtrada por município, exibida no select de escolas, atualizada pelo subscribe no IonViewDidEnter
  municipio$: Subject<string>;                    // município escolhido, atualizado pelo método setCity()
  municipio: string;                              // município escolhido, amarrado no [(ngModel)] do select de município
  escola: string;                                 // escola escolhida pelo usuário, amarrada no [(ngModel)] do select de escola
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    protected appCtrl: App,
    private menuCtrl: MenuController,
    public auth: AuthQuery,
    public api: SeduDenunciasApiService
  ) {
    this.municipios$ = new Subject();
    this.municipio$ = new Subject();
    this.escolasDoMunicipio$ = new Subject();
    this.tiposDenuncia$ = new Subject();
  }

  ionViewCanEnter(): boolean | Promise<any> {
    // Check de autenticação
    let isAllowed = this.auth.isLoggedIn;
    if (!isAllowed) {
      this.showAuthNeededModal()
    }
    return isAllowed;
  }

  ionViewDidEnter() {
    this.slides.lockSwipes(true); // trava o swipe para o usuário seguir o passo a passo

    // Checa a autenticação e obtém os dados do usuário
    if (this.auth.isLoggedIn) {
      this.denuncia.autor = this.auth.state.claims.nome;
      this.denuncia.email = this.auth.state.claims.email;
    }

    // Atualiza a lista de escolas SEMPRE que o usuário troca o município no select
    this.municipio$.subscribe((municipio: string) => {
      this.escolasDoMunicipio$.next(
        this.escolas.filter((escola: Escola) => escola.municipio === municipio)
      );
    });

    this.loadData();
  }

  /**
   * Carrega os dados da API para o app
   */
  loadData() {
    // carrega municípios
    this.api.getMunicipios()
    .subscribe((municipios) => {
      this.municipios$.next(municipios);
    });

    // carrega escolas
    this.api.getSchools()
    .subscribe((escolas) => {
      this.escolas = escolas;
    });

    // carrega tipos de denuncias
    this.api.getDemandTypes()
    .subscribe((tipos) => {
      this.tiposDenuncia$.next(tipos);
    });
  }

  /**
   * Disparado pelo ionChange do ion-select de municípios para atualizar a lista de escolas.
   */
  setCity() {
    this.municipio$.next(this.municipio);
  }

  showAuthNeededModal = () => {
    let alert = this.alertCtrl.create({
      title: 'Login necessário',
      message: 'Você deve estar autenticado no <strong>ES na palma da mão</strong> para acessar essa funcionalidade.',
      buttons: [
        {
          text: 'Entendi',
          handler: () => {
            this.appCtrl
              .getRootNav()
              .setRoot('MyServicesPage')
              .then(() => {
                alert.dismiss();
                this.menuCtrl.close();
              });
            return false;
          },
          role: 'cancel'
        },
        {
          text: 'Autenticar',
          handler: () => {
            this.appCtrl
              .getRootNav()
              .push('LoginPage', { redirectTo: 'SeduDenunciasPage' })
              .then(() => {
                alert.dismiss();
                this.menuCtrl.close();
              });
            return false;
          }
        }
      ]
    });
    return alert.present();
  };

  /** 
   * Envia a reclamação/denuncia.
   */
  send() {
    this.api.sendDemand(this.denuncia as Denuncia)
    .subscribe(
      res => {
        this.showSuccessAlert(res["protocolo"]);
      }
    );
  }

  showSuccessAlert(protocolo) {
    let alert = this.alertCtrl.create({
      title: "Reclamação recebida",
      message: `Nº de Protocolo: ${protocolo}`,
      buttons: [
        {
          text: "OK",
          handler: () => {
            if (this.navCtrl.length() > 1) {
              this.navCtrl.pop();
            }
            else {
              this.navCtrl.setRoot('MyServicesPage');
            }
          }
        }
      ]
    });

    alert.present();
  }

  /**
   * Retorna para o Slide anterior.
   */
  prev() {
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
  }

  /**
   * Avança para o próximo Slide.
   */
  next() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

  /**
   * Diz se o usuário pode avançar a tela ou não, para cada Slide.
   */
  canGoNext(): boolean {
    
    if (this.slides.getActiveIndex() === 0) return true;

    if (this.slides.getActiveIndex() === 1) {
      if (
        this.denuncia.aluno &&
        this.denuncia.codigoEdp &&
        this.denuncia.inepEscola) {
          return true;
      }
    }

    if (this.slides.getActiveIndex() === 2) {
      if (
        this.denuncia.tipo &&
        this.denuncia.descricao) {
          return true;
      }
    }

    return false;
  }

}
