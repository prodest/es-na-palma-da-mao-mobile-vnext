import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController, MenuController } from 'ionic-angular';
import { AuthNeededService, AuthQuery} from '@espm/core';
import { Vehicle, Ticket } from '../../model';
import { VehiclesService } from '../../providers';


@IonicPage()
@Component({
  selector: 'page-detran-service',
  templateUrl: 'detran-service.html',
})
export class DetranServicePage {
  tickets: Ticket[];
  loaded: boolean = false;
  menus = [
    {
      buttonTitle: "CNH",
      targetPage: "DriverLicenseStatusPage"
    },
    /* {
      buttonTitle: "Infrações",
      targetPage: "DriverLicenseStatusPage"
    }, */
    {
      buttonTitle: "Meus Veículos",
      targetPage: "VehiclesPage"
    }
  ];
  

  constructor(public navCtrl: NavController,
              private detran: VehiclesService,
              private authQuery: AuthQuery,
              private alertCtrl: AlertController,
              protected appCtrl: App,
              protected authNeeded: AuthNeededService,
              public navParams: NavParams,
              private menuCtrl: MenuController) {
  }
  /**
   * 
   */
  ionViewCanEnter(): boolean | Promise<any> {
    // permite acesso à tela se autenticados
    const isAllowed = this.authQuery.isLoggedIn;

    if (!isAllowed) {
      this.showAuthNeededModal();
    }
    return isAllowed;
  }
  /**
   * 
   */
  showAuthNeededModal = () => {
    let alert = this.alertCtrl.create({
      title: 'Login necessário',
      message: 'Você deve estar autenticado no <strong>ES na palma da mão</strong> para acessar essa funcionalidade.',
      buttons: [
        {
          text: 'Entendi',
          handler: () => {
            this.appCtrl
              .getRootNav()
              .setRoot('MyServicesPage')
              .then(() => {
                alert.dismiss();
                this.menuCtrl.close();
              });
            return false;
          },
          role: 'cancel'
        },
        {
          text: 'Autenticar',
          handler: () => {
            this.appCtrl
              .getRootNav()
              .setRoot('LoginPage')
              .then(() => {
                alert.dismiss();
                this.menuCtrl.close();
              });
            return false;
          }
        }
      ]
    });
    return alert.present();
  };
/**
 * 
 */

loadData(){
  this.appCtrl.getRootNav().push('DriverLicenseStatusPage');
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
  
}
