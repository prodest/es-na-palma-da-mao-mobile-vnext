import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, AlertController, App, MenuController } from 'ionic-angular';
import { Denuncia } from '../../model/denuncia';
import { AuthQuery } from '@espm/core';

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
    codigoEdp: "",
    tipo: 0,
    outroTipo: "",
    descricao: "",
    inepEscola: ""
  };
  municipio: String;
  escola: String;
  municipios = [
    "Vitória", "Cariacica", "Serra", "Vila Velha", "Viana", "Guarapari"
  ];
  escolas = [
    {"nome": "Escola do Magno", "inep": 123456},
    {"nome": "Escola do Matheus", "inep": 123457},
    {"nome": "Escola do Lucas", "inep": 123458}
  ];
  tiposDenuncia = [
    {id: 0, value: "Ônibus não passou"},
    {id: 1, value: "Ônibus atrasou"},
    {id: 2, value: "Ônibus lotado"},
    {id: 3, value: "Ônibus danificado"},
    {id: 4, value: "Outro"}
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    protected appCtrl: App,
    private menuCtrl: MenuController,
    public auth: AuthQuery
  ) {
    
  }

  ionViewCanEnter(): boolean | Promise<any> {
    let isAllowed = this.auth.isLoggedIn;
    if (!isAllowed) {
      this.showAuthNeededModal()
    }
    return isAllowed;
  }

  ionViewDidEnter() {
    this.slides.lockSwipes(true);

    if (this.auth.isLoggedIn) {
      this.denuncia.autor = this.auth.state.claims.nome;
      this.denuncia.email = this.auth.state.claims.email;
    }
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
    console.log("enviando");
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
