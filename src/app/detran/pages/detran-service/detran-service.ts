import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AuthNeededService, AuthQuery} from '@espm/core';
import { Vehicle } from '../../model';
import { VehiclesService } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-detran-service',
  templateUrl: 'detran-service.html',
})
export class DetranServicePage {
  

  constructor(public navCtrl: NavController,
              private detran: VehiclesService,
              private authQuery: AuthQuery,
              protected appCtrl: App,
              protected authNeeded: AuthNeededService,
              public navParams: NavParams) {

                
  }
  /**
   * 
   */
  ionViewCanEnter(): boolean | Promise<any> {
    // permite acesso à tela se autenticados
    const isAllowed = this.authQuery.isLoggedIn;

    if (!isAllowed) {
      this.authNeeded.showAuthNeededModal();  
    }
    
   // setTimeout(() => this.navCtrl.push('MyServicesPage'),10000);
   
    return isAllowed;
  }
  
  /**
   * 
   */

  back(){
    this.navCtrl.pop();
  }
  /**
   * 
   */
  myVehicle(){
  this.appCtrl.getRootNav().push('VehiclesPage');
  }
  /**
   * 
   */
  cnhVehicle(){
    this.appCtrl.getRootNav().push('DriverLicenseStatusPage');
  }
  /**
   * 
   */
  
  infractionsVehicle = (vehicle: Vehicle) => {
    this.detran
      .getTickets(vehicle)
      .subscribe(
        tickets => this.navCtrl.push('VehicleTicketsPage', { vehicle, plate: vehicle.plate, tickets: tickets }),
        error => console.log(error)
      );
  };
  /**
   * 
   */
  goFavorites(){
    this.navCtrl.push('SelectFavoritePage');
  }
  /**
   * 
   */
  // openPage = (page: string, accessDenied: boolean = false) => {
  //   if (accessDenied) {
  //     this.authNeeded.showAuthNeededModal();
  //   } else {
  //     this.appCtrl.getRootNav().push(page);
  //   }
  // };
}
