import { NgModule } from '@angular/core';
import { DateFormatPipeModule } from '@espm/shared/pipes';
import { IonicPageModule } from 'ionic-angular';

import { LastUpdateComponent } from './last-update.component';

@NgModule({
  imports: [IonicPageModule, DateFormatPipeModule],
  declarations: [LastUpdateComponent],
  exports: [LastUpdateComponent]
})
export class LastUpdateComponentModule {}
