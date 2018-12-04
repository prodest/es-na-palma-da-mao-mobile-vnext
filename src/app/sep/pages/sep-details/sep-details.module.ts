import { NgModule } from '@angular/core';
import { CapitalizePipeModule } from '@espm/shared/pipes';
import { IonicPageModule } from 'ionic-angular';

import { ProtocolDetailItemComponentModule } from './../../components';
import { SepDetailsPage } from './sep-details';

@NgModule({
  declarations: [SepDetailsPage],
  imports: [ProtocolDetailItemComponentModule, CapitalizePipeModule, IonicPageModule.forChild(SepDetailsPage)]
})
export class SepDetailsPageModule {}
