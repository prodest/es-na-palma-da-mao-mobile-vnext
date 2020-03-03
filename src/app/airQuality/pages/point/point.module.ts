import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { AirService } from '../../provider/services'
import { AirApiService } from '../../provider/airApiService';
import { ModulePageComponentModule } from '@espm/shared';
import { QualityPointPage } from './point';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  declarations: [
    QualityPointPage,
  ],
  imports: [
    IonicPageModule.forChild(QualityPointPage),
    HttpClientModule , ModulePageComponentModule, ChartsModule
  ],
  providers: [
    AirService,AirApiService,
  ]
})
export class QualityPointModule {}
