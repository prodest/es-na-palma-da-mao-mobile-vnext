import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams, /*AlertController*/ } from 'ionic-angular';
import { ISiarhesProfile } from '../../interfaces/profile';

@Component({
  selector: 'siarhes-profiles',
  templateUrl: 'siarhes-profiles.component.html'
})
export class SiarhesProfilesComponent {

  @Input() profiles: ISiarhesProfile[] = [];
  @Output() onSelectProfile: EventEmitter<ISiarhesProfile> = new EventEmitter();

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

  selectProfile(profile: ISiarhesProfile) {
    this.onSelectProfile.emit(profile);
  }
}

