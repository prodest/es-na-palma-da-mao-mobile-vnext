import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyServicesPage } from './my-services';

import { NavTitleComponentModule, MainFooterBarComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [MyServicesPage],
  imports: [
    IonicPageModule.forChild(MyServicesPage),
    NavTitleComponentModule,
    MainFooterBarComponentModule
  ]
})
export class MyServicesPageModule {}
