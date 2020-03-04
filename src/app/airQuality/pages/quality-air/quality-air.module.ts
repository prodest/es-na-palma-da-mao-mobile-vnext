import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QualityAirPage } from './quality-air';
import { ModulePageComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [
    QualityAirPage,
  ],
  imports: [
    ModulePageComponentModule,
    IonicPageModule.forChild(QualityAirPage),
  ],
})
export class QualityAirPageModule {}
