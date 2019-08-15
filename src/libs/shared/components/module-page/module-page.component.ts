import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'module-page',
  templateUrl: 'module-page.component.html'
})
export class ModulePageComponent {
  @Input() title: string;
  
  constructor(private navCtrl: NavController) {}
  
  openPage(page: string) {
    this.navCtrl.push(page);
  }
}
