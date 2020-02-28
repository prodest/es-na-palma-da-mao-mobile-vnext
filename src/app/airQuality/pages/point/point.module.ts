import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { AirService } from '../../provider/services'
import { AirApiService } from '../../provider/airApiService';
import { ModulePageComponentModule } from '@espm/shared';
import { QualityPoint } from './point';

@NgModule({
  declarations: [
    QualityPoint,
  ],
  imports: [
    IonicPageModule.forChild(QualityPoint),
    HttpClientModule , ModulePageComponentModule
  ],
  providers: [
    AirService,AirApiService,
  ]
})
export class QualityPointModule {}
