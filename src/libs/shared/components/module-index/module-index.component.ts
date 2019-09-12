import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'module-index',
  templateUrl: 'module-index.component.html'
})
export class ModuleIndexComponent {
  @Input() title: string;
  @Input() icon: string;
  @Input() menus: [{
    buttonTitle: string,
    targetPage: string
  }];
  
  constructor(private navCtrl: NavController) {}
  
  openPage(page: string) {
    this.navCtrl.push(page);
  }
}
