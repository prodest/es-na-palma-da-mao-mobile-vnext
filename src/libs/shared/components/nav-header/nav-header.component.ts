import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'nav-header',
  templateUrl: 'nav-header.component.html'
})
export class NavHeaderComponent {
  @Input() title: string; // title pra ser repassado ao componente nav-title

  constructor(private navCtrl: NavController) {}
  
  back() {
    this.navCtrl.pop();
  }
}
