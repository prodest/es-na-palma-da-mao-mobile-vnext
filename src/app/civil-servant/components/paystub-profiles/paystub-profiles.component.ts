import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams, /*AlertController*/ } from 'ionic-angular';
import { IPaystubProfile } from '../../interfaces/profile';

@Component({
  selector: 'paystub-profiles',
  templateUrl: 'paystub-profiles.component.html'
})
export class PaystubProfilesComponent {

  @Input() profiles: IPaystubProfile[] = [];
  @Output() onSelectProfile: EventEmitter<IPaystubProfile> = new EventEmitter();

  constructor(public navCtrl: NavController, public navParams: NavParams, /*private alert: AlertController*/) { }


  // showDetails(profile: any): void {
  //   const alert = this.alert.create({
  //     title: profile.perfilacesso,
  //     subTitle: profile.perfilacesso,
  //     message: profile.perfilacesso,
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }

  selectProfile(profile: IPaystubProfile) {
    this.onSelectProfile.emit(profile);
  }
}

