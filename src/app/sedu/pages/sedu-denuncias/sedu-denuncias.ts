import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, AlertController, App, LoadingController } from 'ionic-angular';
import { AuthQuery } from '@espm/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SeduDenunciasApiService } from '../../providers';
import { Denuncia, Escola, Municipio, TipoDenuncia, PapelAutorDenuncia, Rota, TurnoRota } from '../../model';

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
    papelDoAutor: null,
    outroPapel: "",
    email: "",
    acesso_cidadao: this.auth.state.claims.subNovo,
    aluno: "",
    codigoEDP: "",
    escolaId: null,
    registroAcademico: "",
    placaVeiculo: "",
    rotaId: null,
    tipoReclamacao: null,
    outroTipo: "",
    dataReclamacao: null,
    descricao: ""
  };

  municipios$: Subject<Municipio[]>;         // lista de municípios, obtida pela api, para exibir no select
  escolas: Escola[];                         // lista de todas as escolas, obtida pela api
  tiposDenuncia$: Subject<TipoDenuncia[]>;   // lista de tipos de denúncias, obtida pela api, para exibir no select
  papeis$: Subject<PapelAutorDenuncia[]>     // lista de papeis dos autores das denuncias
  rotas: Rota[];                             // lista de rotas, obtida pela api
  turnos: TurnoRota[];                       // lista de turnos, obtida pela api

  
  municipio$: Subject<number>;               // município escolhido, atualizado pelo método setCity()
  escolasDoMunicipio$: Subject<Escola[]>;    // lista de escolas, filtrada por município, exibida no select de escolas, atualizada pelo subscribe no IonViewDidEnter
  escola$: Subject<number>                   // escola escolhida, atualizado pelo método setSchool()
  rotasDaEscola$: Subject<Rota[]>;           // lista de rotas, filtrada por escola, exibida no select de rotas, atualizada pelo subscribe no IonViewDidEnter
  
  canSend$: BehaviorSubject<boolean>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
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
    this.papeis$ = new Subject();

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
    this.municipio$.subscribe((municipio: number) => {
      this.escolasDoMunicipio$.next(
        this.escolas.filter((escola: Escola) => escola.municipio === municipio)
      );
    });

    this.escola$.subscribe((idEscola: number) => {
      const loading = this.presentLoading();

      this.api.getSchoolRoutes(idEscola)
      .subscribe((rotas: Rota[]) => {
        this.rotas = rotas;
        this.rotasDaEscola$.next(rotas);
        loading.dismiss();
      });
    });

    this.loadData();
  }

  /**
   * Carrega os dados da API para o app
   */
  loadData() {
    // carrega municípios
    this.api.getMunicipios()
    .subscribe((municipios: Municipio[]) => {
      // console.log("municipios", municipios);
      this.municipios$.next(municipios);
    });

    // carrega escolas
    this.api.getSchools()
    .subscribe((escolas: Escola[]) => {
      // console.log("escolas", escolas);
      this.escolas = escolas;
    });

    // carrega tipos de denuncias
    this.api.getDemandTypes()
    .subscribe((tipos: TipoDenuncia[]) => {
      // console.log("tipos", tipos);
      this.tiposDenuncia$.next(tipos);
    });

    const loading = this.presentLoading();
    // carrega papeis dos autores de reclamação/denuncia
    this.api.getRoles()
    .subscribe((papeis: PapelAutorDenuncia[]) => {
      // console.log("papeis", papeis);
      this.papeis$.next(papeis);
      loading.dismiss();
    });

    // carrega turnos das rotas
    this.api.getRouteShifts()
    .subscribe((turnos: TurnoRota[]) => {
      // console.log("turnos", turnos);
      this.turnos = turnos;
    });
  }

  /**
   * Cria e inicializa um loading
   */
  presentLoading() {
    const loader = this.loadCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
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
    // console.log("set escola", e);
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
    this.api.sendDemand(this.denuncia)
    .subscribe(
      res => {
        // console.log(res);
        this.showSuccessAlert(res);
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
        if (this.denuncia.papelDoAutor === 3) {
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
        this.denuncia.rotaId) {
          return true;
      }
    }

    return false;
  }

  updateSenderLock() {    
    this.canSend$.next(
      (this.denuncia.tipoReclamacao.toString() && this.denuncia.descricao) ? true : false
    );
  }
}
