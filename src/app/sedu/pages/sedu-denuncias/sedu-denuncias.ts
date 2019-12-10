import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, AlertController, App } from 'ionic-angular';
import { Denuncia } from '../../model/denuncia';
import { AuthQuery } from '@espm/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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
    papelDoAutor: "",
    outroPapel: "",
    email: "",
    aluno: "",
    codigoEDP: "",
    registroAcademico: "",
    placaVeiculo: "",
    tipoReclamacao: "",
    dataReclamacao: null,
    descricao: "",
    inepEscola: "",
    codigoRota: null
  };

  municipios$: Subject<Array<any>>;               // lista de municípios, obtida pela api, para exibir no select
  escolas: Array<Escola>;                         // lista de todas as escolas, obtida pela api
  tiposDenuncia$: Subject<Array<any>>;            // lista de tipos de denúncias, obtida pela api, para exibir no select
  rotas: Array<any>;                              // lista de rotas, obetida pela api
  
  municipio$: Subject<string>;                    // município escolhido, atualizado pelo método setCity()
  escolasDoMunicipio$: Subject<Array<Escola>>;    // lista de escolas, filtrada por município, exibida no select de escolas, atualizada pelo subscribe no IonViewDidEnter
  escola$: Subject<string>                        // escola escolhida, atualizado pelo método setSchool()
  rotasDaEscola$: Subject<Array<any>>;            // lista de rotas, filtrada por escola, exibida no select de rotas, atualizada pelo subscribe no IonViewDidEnter
  
  canSend$: BehaviorSubject<boolean>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    protected appCtrl: App,
    public auth: AuthQuery,
    public api: SeduDenunciasApiService
  ) {
    this.municipios$ = new Subject();
    this.municipio$ = new Subject();
    this.escola$ = new Subject();
    this.escolasDoMunicipio$ = new Subject();
    this.tiposDenuncia$ = new Subject();
    this.rotasDaEscola$ = new Subject();

    this.canSend$ = new BehaviorSubject(false);

    this.denuncia.dataReclamacao = new Date();
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

    this.escola$.subscribe((escola: string) => {
      this.rotasDaEscola$.next(
        this.rotas.filter((rota) => `${rota.inepEscola}` === escola)
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

    // carrega rotas
    this.api.getAllRoutes()
    .subscribe((rotas) => {
      this.rotas = rotas;
    });
  }

  /**
   * Disparado pelo ionChange do ion-select de municípios para atualizar a lista de escolas.
   */
  setCity(e) {
    this.municipio$.next(e);
  }

  /**
   * 
   */
  setSchool(e) {
    this.escola$.next(e);
  }

  /**
   * 
   */
  setDay({day, month, year}) {
    this.denuncia.dataReclamacao.setFullYear(year, month-1, day);
  }

  /**
   * 
   */
  setHour({hour, minute}) {
    this.denuncia.dataReclamacao.setHours(hour, minute);
  }

  /** 
   * Envia a reclamação/denuncia.
   */
  send = () => {
    this.api.sendDemand({
      ...this.denuncia,
      dataReclamacaoString: this.denuncia.dataReclamacao.toISOString()
    } as Denuncia)
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
          text: "Ok, voltar ao início",
          handler: () => {
            if (this.navCtrl.length() > 1) {
              this.navCtrl.pop();
            }
            else {
              this.navCtrl.setRoot('SeduIndexPage');
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
    
    if (this.slides.getActiveIndex() === 0) {
      if (this.denuncia.papelDoAutor) {
        if (this.denuncia.papelDoAutor === "2") {
          if (this.denuncia.outroPapel) {
            return true;
          }
          return false;
        }
        return true;
      }
    }

    if (this.slides.getActiveIndex() === 1) {
      if (
        this.denuncia.aluno &&
        this.denuncia.codigoEDP &&
        this.denuncia.codigoRota) {
          return true;
      }
    }

    return false;
  }

  updateSenderLock() {    
    this.canSend$.next(
      (this.denuncia.tipoReclamacao && this.denuncia.descricao) ? true : false
    );
  }
}
