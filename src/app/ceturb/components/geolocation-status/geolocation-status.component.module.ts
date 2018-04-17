import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { GeolocationStatusComponent } from './geolocation-status.component';

@NgModule({
  declarations: [GeolocationStatusComponent],
  imports: [IonicPageModule],
  exports: [GeolocationStatusComponent]
})
export class GeolocationStatusModule {}
