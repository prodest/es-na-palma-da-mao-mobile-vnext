import { Component } from '@angular/core';
import { IonicPage, App, NavController } from 'ionic-angular';
import { AuthQuery } from '@espm/core';
import { AuthNeededService } from '@espm/core/auth/auth-needed.service';

@IonicPage()
@Component({
  selector: 'page-select-favorite',
  templateUrl: 'select-favorite.html',
})
export class SelectFavoritePage {
  public noticias = '../assets/imgs/bg-menu-principal-topo (1).jpg';
  isLoggedIn: boolean;
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

  constructor(
    protected appCtrl: App,
    protected authQuery: AuthQuery,
    protected authNeeded: AuthNeededService,
    protected navCtrl: NavController
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
        component: 'TransparencyDashboardmatlabPage',
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
   * seleciona os serviços favoritos
   */
  markList() {
    this.listaDeSelecionados = this.menus.filter((menu) => menu.isChecked);
    console.log( this.listaDeSelecionados );
  }
  /**
   * // marcar e desmarcar todos os checkebox
   */
  
  markUncheckList(){
    
    if(this.markAll === true){
      this.listaDeSelecionados = [];
      for(let i = 0; i < this.menus.length; ++i){
        this.menus[i].isChecked =true;
        this.listaDeSelecionados.push(this.menus[i]);
      }
    }else{
      for(let i = 0; i < this.menus.length; ++i){
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
  /**
   * 
   */
  goToDashboard(){
    this.navCtrl.push('DashboardFavoritePage', this.listaDeSelecionados)
  }
  
  backDashboard(){
    this.navCtrl.push('DashboardPage')
  }
}




 