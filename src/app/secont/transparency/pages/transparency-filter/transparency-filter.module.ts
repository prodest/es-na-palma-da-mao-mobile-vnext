import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransparencyFilterPage } from './transparency-filter';
import { ModulePageComponentModule, LargeButtonComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [TransparencyFilterPage],
  imports: [ModulePageComponentModule, LargeButtonComponentModule, IonicPageModule.forChild(TransparencyFilterPage)]
})
export class TransparencyFilterPageModule {}
