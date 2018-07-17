import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthQuery, AuthService } from '@espm/core';
import { AlertController, App, MenuController } from 'ionic-angular';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

const menus = [
  {
    name: 'Principal',
    items: [
      {
        title: 'Principal',
        icon: 'apps',
        component: 'DashboardPage',
        order: 1
      },
      {
        title: 'Notícias Destaques',
        icon: 'paper',
        component: 'NewsHighlightsPage',
        order: 1
      },
      {
        title: 'Notícias',
        icon: 'paper',
        component: 'NewsListPage',
        order: 1
      },
      {
        title: 'Agenda ES',
        icon: 'calendar',
        component: 'CalendarPage',
        order: 6
      },
      {
        title: 'Consulta Processo',
        icon: 'search',
        component: 'SepSearchPage',
        order: 8
      }
    ]
  },
  {
    name: 'Detran',
    items: [
      {
        title: 'Situação CNH',
        icon: 'car',
        component: 'DriverLicensePage',
        order: 2,
        secure: true
      },
      {
        title: 'Multas por Veículo',
        icon: 'car',
        component: 'VehiclesPage',
        order: 2,
        secure: true
      }
    ]
  },
  {
    name: 'Ceturb',
    items: [
      {
        title: 'Consulta Ônibus',
        icon: 'bus',
        component: 'BusLinesPage',
        order: 3
      },
      {
        title: 'Transcol Online',
        icon: 'bus',
        component: 'TranscolOnlinePage',
        order: 2
      }
    ]
  },
  {
    name: 'Transparência',
    items: [
      {
        title: 'Portal da Transparência',
        icon: 'pie',
        component: 'TransparenciaDashboardPage',
        order: 2
      }
    ]
  },
  {
    name: 'Diário Oficial ES',
    items: [
      {
        title: 'Consultas',
        icon: 'search',
        component: 'DioSearchPage',
        order: 4
      },
      {
        title: 'Edições Recentes',
        icon: 'time',
        component: 'LatestEditionsPage',
        order: 5
      }
    ]
  },
  {
    name: 'Outros',
    items: [
      {
        title: 'Sobre',
        icon: 'information-circle',
        component: 'AboutPage',
        order: 99
      }
    ]
  }
];

@Component({
  selector: 'espm-menu',
  templateUrl: './menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit, OnDestroy {
  menus = menus;
  rootPage: any = 'HomePage';
  isLoggedIn: boolean;
  private destroyed$ = new Subject<boolean>();

  /**
   *
   */
  constructor(
    private authQuery: AuthQuery,
    private auth: AuthService,
    private menuCtrl: MenuController,
    private alertCtrl: AlertController,
    private appCtrl: App,
    private cd: ChangeDetectorRef
  ) {}

  /**
   *
   */
  ngOnInit() {
    this.authQuery.isLoggedIn$
      .pipe(tap(() => this.cd.markForCheck()), takeUntil(this.destroyed$))
      .subscribe(isLoggedIn => (this.isLoggedIn = isLoggedIn));
  }

  /**
   *
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

  /**
   *
   */
  openPage = (page: string, accessDenied: boolean = false) => {
    if (accessDenied) {
      this.showAuthNeededModal();
    } else {
      this.appCtrl.getRootNav().setRoot(page);
      this.menuCtrl.close();
    }
  };

  /**
   *
   */
  logout = () => {
    this.auth.logout().then(() => this.openPage('HomePage'));
  };

  /**
   *
   *
   */
  private showAuthNeededModal = () => {
    let alert = this.alertCtrl.create({
      title: 'Login necessário',
      message: 'Você deve estar autenticado no <strong>ES na palma da mão</strong> para acessar essa funcionalidade.',
      buttons: [
        {
          text: 'Entendi',
          role: 'cancel'
        },
        {
          text: 'Autenticar',
          handler: () => {
            this.appCtrl
              .getRootNav()
              .push('LoginPage')
              .then(() => alert.dismiss());
            return false;
          }
        }
      ]
    });
    return alert.present();
  };
}
