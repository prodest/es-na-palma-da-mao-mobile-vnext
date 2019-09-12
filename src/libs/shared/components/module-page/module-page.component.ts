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
  limite = (title) => {
    if (this.title.length > 17){
      return this.title.substring(0, 17)+"…";
      }else{
      return this.title;
      }
  }
  
}
