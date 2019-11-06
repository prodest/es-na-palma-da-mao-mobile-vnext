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

  denuncia: Denuncia = {
    autor: "",
    email: "",
    codigoEdp: "",
    RA: "",
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
    "Escola 1",
    "Escola 2",
    "Escola 3",
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
    console.log(this.auth.state.claims);
    
    this.denuncia.autor = this.auth.state.claims.nome;
    this.denuncia.email = this.auth.state.claims.email;
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

  send() {
    console.log("enviando");
  }

  prev() {
    this.slides.slidePrev();
  }

  next() {
    this.slides.slideNext();
  }

}
