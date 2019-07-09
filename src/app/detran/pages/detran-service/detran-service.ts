import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AuthNeededService} from '@espm/core';

@IonicPage()
@Component({
  selector: 'page-detran-service',
  templateUrl: 'detran-service.html',
})
export class DetranServicePage {

  constructor(public navCtrl: NavController,
             // private authQuery: AuthQuery,
              protected appCtrl: App,
              protected authNeeded: AuthNeededService,
              public navParams: NavParams) {
  }
  /**
   * 
   */
  // ionViewCanEnter(): boolean | Promise<any> {
  //   // permite acesso à tela se autenticados
  //   const isAllowed = this.authQuery.isLoggedIn;

  //   if (!isAllowed) {
  //     this.authNeeded.showAuthNeededModal();
      
  //   }
  //   setTimeout(() => this.navCtrl.push('MyServicesPage'));
   
  //   return isAllowed;
  // }
  
  /**
   * 
   */

  back(){
    this.navCtrl.pop();
  }
  /**
   * 
   */
  // myVehicle(){
  // this.navCtrl.setRoot('VehiclesPage');
  // }
  /**
   * 
   */
  cnhVehicle(){
  this.navCtrl.push('DriverLicenseStatusPage');
  }
  /**
   * 
   */
  infractionsVehicle(){

  }
  /**
   * 
   */
  goFavorites(){
    this.navCtrl.push('SelectFavoritePage');
  }
  /**
   * 
   */
  openPage = (page: string, accessDenied: boolean = false) => {
    if (accessDenied) {
      this.authNeeded.showAuthNeededModal();
    } else {
      this.appCtrl.getRootNav().push(page);
    }
  };
}
