import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyServicesPage } from './my-services';
import { MenuService } from '../../providers/menu.service';

import { NavTitleComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [MyServicesPage],
  imports: [
    IonicPageModule.forChild(MyServicesPage),
    NavTitleComponentModule
  ],
  providers: [MenuService]
})
export class MyServicesPageModule {}
