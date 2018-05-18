import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SepDetailsPage } from './sep-details';
import { ProtocolDetailItemComponentModule } from './../../components';
import { CapitalizePipeModule } from '@espm/shared/pipes';

@NgModule({
  declarations: [SepDetailsPage],
  imports: [ProtocolDetailItemComponentModule, CapitalizePipeModule, IonicPageModule.forChild(SepDetailsPage)]
})
export class SepDetailsPageModule {}
