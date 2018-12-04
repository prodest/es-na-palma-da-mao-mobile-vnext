import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AlertController, Loading, LoadingController, ToastController } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';

import { Ticket, Vehicle } from './../../model';
import { DetranApiService } from '../../providers/detran-api.service';


@Component({
  selector: 'espm-tickets',
  templateUrl: 'tickets.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketsComponent { 

  constructor(    
    private alertCtrl: AlertController,
    private api: DetranApiService,
    private loadingCtrl: LoadingController,
    private clipboard: Clipboard,
    private toastCtrl: ToastController,
  ) { }
  
  @Input() vehicle: Vehicle;
  @Input() tickets: Ticket[];  

  loading: Loading;

  generateBillet = () => {
    this.showLoading();
    let ids = [];
    for (let i = 0; i < this.tickets.length; i++){
      ids.push(this.tickets[i].id)
    }    
    //this.api.generateGRU(this.vehicle, ids).subscribe(req => {
    this.api.generateGRU(this.vehicle).subscribe(req => {
      this.dismissLoading();
      try {
        this.showGRUCode(req["Guia"]["ItemGuia"][0]["LinhaDigitavel"])
      } catch {
        this.showGRUCode("Não foi possível recuperar o código de barras")
      }
    });     
       
  };

  showGRUCode = (str) => {
    let alert = this.alertCtrl.create({
      title: 'Código de barras',
      message: str,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.clipboard.copy(str);            
            this.showMessage("Código de barras copiado!");
            return true;
          }
        }
      ]
    });
    alert.present();
  }


  totalAmount = () => {
    let total = 0.0
    for (let i = 0; i < this.tickets.length; i++) {    
      total += this.tickets[i].amount
    } 
    return total;
  }

  private showLoading = (message: string = 'Aguarde') => {
    if (this.loading) {
      this.loading.setContent(message);
    } else {
      this.loading = this.loadingCtrl.create({ content: message, dismissOnPageChange: true });
      this.loading.present();
    }
  };

  private dismissLoading = () => {
    if (this.loading) {
      this.loading.dismiss().catch(console.log);
      this.loading = null;
    }
  };

  private showMessage = (message: string) => {
    this.toastCtrl.create({ message, duration: 4000 }).present();
  };
}
