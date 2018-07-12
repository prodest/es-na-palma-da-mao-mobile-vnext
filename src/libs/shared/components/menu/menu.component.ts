import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '@espm/core';
import { App } from 'ionic-angular';

const menus = [
  // {
  //   name: 'Principal',
  //   items: [
  //     {
  //       title: 'Principal',
  //       icon: 'apps',
  //       component: 'HomePage',
  //       order: 1
  //     },
  //     {
  //       title: 'Notícias Destaques',
  //       icon: 'paper',
  //       component: 'NewsHighlightsPage',
  //       order: 1
  //     },
  //     {
  //       title: 'Notícias',
  //       icon: 'paper',
  //       component: 'NewsListPage',
  //       order: 1
  //     },
  //     {
  //       title: 'Agenda',
  //       icon: 'calendar',
  //       component: 'CalendarPage',
  //       order: 1
  //     },
  //     {
  //       title: 'Transparência',
  //       icon: 'grid',
  //       component: 'TransparenciaDashboardPage',
  //       order: 2
  //     },

  //     {
  //       title: 'Detran CNH',
  //       icon: 'card',
  //       component: 'DriverLicensePage',
  //       order: 2
  //     },
  //     {
  //       title: 'Detran CNH Status',
  //       icon: 'card',
  //       component: 'DriverLicenseStatusPage',
  //       order: 2
  //     },
  //     {
  //       title: 'Detran Veículos',
  //       icon: 'car',
  //       component: 'VehiclesPage',
  //       order: 2
  //     },
  //     {
  //       title: 'Ceturb Linhas',
  //       icon: 'bus',
  //       component: 'BusLinesPage',
  //       order: 3
  //     },
  //     {
  //       title: 'Dio Consulta',
  //       icon: 'document',
  //       component: 'DioSearchPage',
  //       order: 4
  //     },
  //     {
  //       title: 'Dio Edições Recentes',
  //       icon: 'time',
  //       component: 'LatestEditionsPage',
  //       order: 5
  //     },
  //     {
  //       title: 'Ceturb Transcol Online',
  //       icon: 'bus',
  //       component: 'TranscolOnlinePage',
  //       order: 2
  //     },
  //     {
  //       title: 'Agenda ES',
  //       icon: 'calendar',
  //       component: 'CalendarPage',
  //       order: 6
  //     },
  //     {
  //       title: 'Consulta Processo',
  //       icon: 'search',
  //       component: 'SepSearchPage',
  //       order: 8
  //     },
  //     {
  //       title: 'Sobre',
  //       icon: 'information-circle',
  //       component: 'AboutPage',
  //       order: 99
  //     }
  //   ]
  // },
  {
    name: 'Principal',
    items: [
      {
        title: 'Principal',
        icon: 'apps',
        component: 'HomePage',
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
        order: 2
      },
      {
        title: 'Multas por Veículo',
        icon: 'car',
        component: 'VehiclesPage',
        order: 2
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
export class MenuComponent {
  menus = menus;
  rootPage: any = 'HomePage';

  /**
   *
   */
  constructor(private auth: AuthService, private appCtrl: App) {}

  /**
   *
   */
  openPage = (page: string) => this.appCtrl.getRootNav().setRoot(page);

  /**
   *
   */
  logout = () => {
    this.auth.logout().then(() => this.openPage('HomePage'));
  };
}
