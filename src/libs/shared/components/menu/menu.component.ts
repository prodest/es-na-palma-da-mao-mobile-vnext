import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthQuery, AuthService } from '@espm/core';
import { AuthNeededService } from '@espm/core/auth/auth-needed.service';
import { AppAvailability } from '@ionic-native/app-availability';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { App, MenuController, Platform } from 'ionic-angular';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

const menus = [
  {
    name: 'Principal ',
    items: [
      {
        title: 'Meus Serviços',
        icon: 'custom-menu-meus-servicos',
        component: 'MyServicesPage',
        order: 1
      },

    {
      
      title: 'Sobre',
      icon: 'information-circle',
      component: 'AboutPage',
      isChecked: false
    },
      
      // {
      //   title: 'Notícias Destaques',
      //   icon: 'paper',
      //   component: 'NewsHighlightsPage',
      //   order: 1
      // },
      // {
      //   title: 'Notícias',
      //   icon: 'paper',
      //   component: 'NewsListPage',
      //   order: 1
      // },
      // {
      //   title: 'Agenda ES',
      //   icon: 'calendar',
      //   component: 'CalendarPage',
      //   order: 6
      // },
      // {
      //   title: 'Consulta Processo',
      //   icon: 'search',
      //   component: 'SepSearchPage',
      //   order: 8
      // }
    ]
  },
  // {
  //   name: 'Detran',
  //   items: [
  //     {
  //       title: 'Situação CNH',
  //       icon: 'car',
  //       component: 'DriverLicensePage',
  //       order: 2,
  //       secure: true
  //     },
  //     {
  //       title: 'Consulta Veículos',
  //       icon: 'car',
  //       component: 'VehiclesPage',
  //       order: 2,
  //       secure: true
  //     }
  //   ]
  // },
  // {
  //   name: 'PRODEST',
  //   items: [
  //     {
  //       title: 'Agendar Atendimento',
  //       icon: 'calendar',
  //       component: 'SchedulingPage',
  //       order: 1
  //     },
  //     {
  //       title: 'Consultar Agendamento',
  //       icon: 'search',
  //       component: 'ConsultSchedulingPage',
  //       order: 1
  //     }
  //   ]
  // },
  // {
  //   name: 'E-Docs',
  //   items: [
  //     {
  //       title: 'Documentos para assinar',
  //       icon: 'create',
  //       component: 'DocumentsToSignPage',
  //       order: 2,
  //       secure: true
  //     }
  //   ]
  // },
  // {
  //   name: 'Ceturb',
  //   items: [
  //     {
  //       title: 'Consulta Ônibus',
  //       icon: 'bus',
  //       component: 'BusLinesPage',
  //       order: 3
  //     },
  //     {
  //       title: 'Transcol Online',
  //       icon: 'bus',
  //       component: 'TranscolOnlinePage',
  //       order: 2
  //     }
  //   ]
  // },
  // {
  //   name: 'Transparência',
  //   items: [
  //     {
  //       title: 'Portal da Transparência',
  //       icon: 'pie',
  //       component: 'TransparencyDashboardPage',
  //       order: 2
  //     }
  //   ]
  // },
  // {
  //   name: 'Diário Oficial ES',
  //   items: [
  //     {
  //       title: 'Consultas',
  //       icon: 'search',
  //       component: 'DioSearchPage',
  //       order: 4
  //     },
  //     {
  //       title: 'Edições Recentes',
  //       icon: 'time',
  //       component: 'LatestEditionsPage',
  //       order: 5
  //     }
  //   ]
  // },
  // {
  //   name: 'Servidor',
  //   items: [
  //     {
  //       title: 'Táxi Gov',
  //       icon: 'car',
  //       component: '',
  //       order: 6,
  //       url: 'mb://action=login',
  //       name: 'app.mb',
  //       deepLink: true,
  //       package: 'mb.taxi.meiabandeirada',
  //       uriScheme: 'mb://'
  //     }
  //   ]
  // },
  // {
  //   name: 'Oportunidades',
  //   items: [
  //     {
  //       title: 'Buscar concursos',
  //       icon: 'search',
  //       component: 'ApresentacaoPage',
  //       order: 7
  //     }
  //   ]
  // },
  // {
  //   name: 'Outros',
  //   items: [
  //     {
  //       title: 'Sobre',
  //       icon: 'information-circle',
  //       component: 'AboutPage',
  //       order: 99
  //     }
  //   ]
  // }
];

@Component({
  selector: 'espm-menu',
  templateUrl: './menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit, OnDestroy {
  menus = menus;
  rootPage: any = 'MyServicesPage';
  isLoggedIn: boolean;
  private destroyed$ = new Subject<boolean>();

  /**
   *
   */
  constructor(
    private iab: InAppBrowser,
    private appAvailability: AppAvailability,
    private authNeeded: AuthNeededService,
    private authQuery: AuthQuery,
    private auth: AuthService,
    private menuCtrl: MenuController,
    private appCtrl: App,
    private cd: ChangeDetectorRef,
    private platform: Platform
  ) {}

  /**
   *
   */
  ngOnInit() {
    this.authQuery.authChanged$
      .pipe(tap(() => this.cd.markForCheck()), takeUntil(this.destroyed$))
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
   *
   */
  openPage = (route: any, accessDenied: boolean = false) => {
    if (accessDenied) {
      this.authNeeded.showAuthNeededModal();
    } else {
      if (route.deepLink) {
        if (this.platform.is('ios')) {
          // TODO: Verificar como fazer para ios
          this.appAvailability.check(route.uriScheme).then((yes: boolean) => console.log(yes), (no: any) => console.log(no));
        } else {
          this.appAvailability
            .check(route.package)
            .then(
              () => this.iab.create(route.url, '_system'),
              () => this.iab.create('market://details?id=' + route.package, '_system')
            );
        }
      } else {
        this.appCtrl.getRootNav().push(route.component);
        this.menuCtrl.close();
      }
    }
  };
  /*
   *
   */
  login = () => {
    this.openPage({ component: 'LoginPage' });
  };
  /**
   *
   */
  logout = () => {
    this.auth.logout().then(() => this.appCtrl.getRootNav().setRoot('MyServicesPage'));
  };
  
}
