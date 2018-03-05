import { NgModule } from '@angular/core'
import { CapitalizePipeModule, DateFormatPipeModule, FromNowPipeModule } from '@espm/shared/pipes'
import { IonicPageModule } from 'ionic-angular'

import { DetranPipesModule } from '../../pipes'
import { DriverStatusComponent } from './driver-status.component'

@NgModule({
  declarations: [DriverStatusComponent],
  imports: [IonicPageModule, DetranPipesModule, FromNowPipeModule, CapitalizePipeModule, DateFormatPipeModule],
  exports: [DriverStatusComponent]
})
export class DriverStatusComponentModule {}
