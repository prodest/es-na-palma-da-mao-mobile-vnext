import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyServicesPage } from './my-services';
import { MenuService } from '../../providers/menu.service';

@NgModule({
  declarations: [MyServicesPage],
  imports: [IonicPageModule.forChild(MyServicesPage)],
  providers: [MenuService]
})
export class MyServicesPageModule {}
