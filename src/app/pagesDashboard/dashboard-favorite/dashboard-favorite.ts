import { Component } from '@angular/core';
import { IonicPage, NavController, App, NavParams } from 'ionic-angular';
import { AuthQuery, AuthNeededService } from '@espm/core';

type Favorite = {
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
}

@IonicPage()
@Component({
  selector: 'page-dashboard-favorite',
  templateUrl: 'dashboard-favorite.html',
})
export class DashboardFavoritePage{
    
    private servicosSelecionados:Array<Favorite>;
    private serveSelect:Array<Favorite[]> = [];
   
    constructor(
    protected appCtrl: App,
    protected authQuery: AuthQuery,
    protected authNeeded: AuthNeededService,
    protected navCtrl: NavController,
    private navParams: NavParams) {

      this.servicosSelecionados = this.navParams.data; 

      this.servicosSelecionados.map((elemento: Favorite, index: number) => {
        if (index%4 === 0) {
          this.serveSelect.push([])
        }
        this.serveSelect[this.serveSelect.length-1].push(elemento);
      });
      
      
  }
  openPage = (page: string, accessDenied: boolean = false) => {
    if (accessDenied) {
      this.authNeeded.showAuthNeededModal();
    } else {
      this.appCtrl.getRootNav().push(page);
    }
  };
  backDashboard(){
    this.navCtrl.push('SelectFavoritePage')
  }
}
