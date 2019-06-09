import { Component, OnInit, OnDestroy,ViewChild } from '@angular/core';
import { IonicPage, App, NavController,Slides } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { AuthQuery } from '@espm/core';
import { tap, takeUntil } from 'rxjs/operators';
import { AuthNeededService } from '@espm/core/auth/auth-needed.service';

@IonicPage()
@Component({
  selector: 'page-home-screen',
  templateUrl: 'home-screen.html'
})
export class HomeScreenPage implements OnInit, OnDestroy {
  @ViewChild('slides') slides: Slides;
  isLoggedIn: boolean;
  private destroyed$ = new Subject<boolean>();
  
  public markAll: boolean;
  
  public menus: Array<{
    title: string;
    icon: string;
    component: string;
    isChecked: boolean;
    secure?: boolean;
    url?: string;
    name?: string;
    deepLink?: boolean;
    package?: string;
    uriScheme?: string;
  }> = [];
  
  public listaDeSelecionados: Array<{
    title: string;
    icon: string;
    component: string;
    secure?: boolean;
    url?: string;
    name?: string;
    deepLink?: boolean;
    package?: string;
    uriScheme?: string;
  }> = [];
  
  headerContentWelcome: Array<string> = ['Bem vindo ao','Espírito Santo','na Palma da Mão'];
  headerContentAccess: Array<string> = ['Acesse','seus serviços','digitais'];
  
  constructor (
    private appCtrl: App,
    private authQuery: AuthQuery,
    private authNeeded: AuthNeededService,
    private navCtrl: NavController
  ) {
    this.menus = [
      {
        title: 'Notícias Destaques',
        icon: 'paper',
        component: 'NewsHighlightsPage',
        isChecked: false
      },
      {
        title: 'Notícias',
        icon: 'paper',
        component: 'NewsListPage',
        isChecked: false
      },
      {
        title: 'Agenda ES',
        icon: 'calendar',
        component: 'CalendarPage',
        isChecked: false
      },
      {
        title: 'Consulta Processo',
        icon: 'search',
        component: 'SearchPage',
        isChecked: false
      },
      
      {
        title: 'Situação CNH',
        icon: 'car',
        component: 'DriverLicensePage',
        secure: true,
        isChecked: false
      },
      {
        title: 'Consulta Veículos',
        icon: 'car',
        component: 'VehiclesPage',
        secure: true,
        isChecked: false
      },
      
      {
        title: 'Documentos para assinar',
        icon: 'create',
        component: 'DocumentsToSignPage',
        secure: true,
        isChecked: false
      },
      
      {
        title: 'Consulta Ônibus',
        icon: 'bus',
        component: 'BusLinesPage',
        isChecked: false
      },
      {
        title: 'Transcol Online',
        icon: 'bus',
        component: 'TranscolOnlinePage',
        isChecked: false
      },
      
      {
        title: 'Portal da Transparência',
        icon: 'pie',
        component: 'TransparencyDashboardPage',
        isChecked: false
      },
      
      {
        title: 'Consultas',
        icon: 'search',
        component: 'DioSearchPage',
        isChecked: false
      },
      {
        title: 'Edições Recentes',
        icon: 'time',
        component: 'LatestEditionsPage',
        isChecked: false
      },
      
      {
        title: 'Táxi Gov',
        icon: 'car',
        component: '',
        url: 'mb://action=login',
        name: 'app.mb',
        deepLink: true,
        package: 'mb.taxi.meiabandeirada',
        uriScheme: 'mb://',
        isChecked: false
      },
      
      {
        title: 'Buscar concursos',
        icon: 'search',
        component: 'Apresentacao',
        isChecked: false
      },
      
      {
        title: 'Sobre',
        icon: 'information-circle',
        component: 'AboutPage',
        isChecked: false
      }
    ];
  }

  /**
  *
  */
  ngOnInit() {
    this.authQuery.isLoggedIn$
    .pipe(tap(() => takeUntil(this.destroyed$)))
    .subscribe(isLoggedIn => (this.isLoggedIn = isLoggedIn));
  }
  
  /**
  *            
  */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
  
  /**
  * //seleciona os serviços favoritos
  */
  marcarLista() {
    this.listaDeSelecionados = this.menus.filter(this.isChecked);
  }
  
  /**
  *
  */
  // marcar e desmarcar todos os checkebox
  marcarTodos() {
    if (this.markAll === true) {
      this.listaDeSelecionados = [];

      for (let i = 0; i < this.menus.length; ++i) {
        this.menus[i].isChecked =true;
        this.listaDeSelecionados.push(this.menus[i]);
      }
    } else {
      for (let i = 0; i < this.menus.length; ++i) {
        this.menus[i].isChecked =false;
      }

      this.listaDeSelecionados = [];
    }
  }

  /**
  *
  */
  isChecked(item) { 
    if (item.isChecked) return item;
  }

  /**
  * direciona para pagina de login
  */
  openPageLogin() {
    this.navCtrl.setRoot('LoginPage');
  }

  /**
  * direciona para paginas de visitantes pasando paramentros array menus
  */
  openPageMyServices() {
    this.navCtrl.setRoot('MyServicesPage', this.menus);
  }

  /*
  *
  */
  openPage = (page: string, accessDenied: boolean = false) => {
    if (accessDenied) {
      this.authNeeded.showAuthNeededModal();
    } else {
      this.appCtrl.getRootNav().push(page);
    }
  };
  
  next() {
    this.slides.slideNext();
  }  
}
