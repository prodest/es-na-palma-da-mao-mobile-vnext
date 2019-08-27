import { NgModule } from '@angular/core';
import { CapitalizePipeModule } from '@espm/shared/pipes';
import { IonicPageModule } from 'ionic-angular';

import { ProtocolDetailItemComponentModule } from './../../components';
import { SepDetailsPage } from './sep-details';
import { ModulePageComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [SepDetailsPage],
  imports: [ModulePageComponentModule, ProtocolDetailItemComponentModule, CapitalizePipeModule, IonicPageModule.forChild(SepDetailsPage)]
})
export class SepDetailsPageModule {}
