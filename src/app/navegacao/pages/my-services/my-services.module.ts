import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyServicesPage } from './my-services';

@NgModule({
  declarations: [
    MyServicesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyServicesPage),
  ],
})
export class MyServicesPageModule {}
