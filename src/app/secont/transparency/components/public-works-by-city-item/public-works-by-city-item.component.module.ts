import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PublicWorkStatusComponentModule } from '../public-work-status';
import { PublicWorksByCityItemComponent } from './public-works-by-city-item.component';

@NgModule({
  imports: [IonicPageModule, PublicWorkStatusComponentModule],
  declarations: [PublicWorksByCityItemComponent],
  exports: [PublicWorksByCityItemComponent]
})
export class PublicWorksByCityItemComponentModule {}
