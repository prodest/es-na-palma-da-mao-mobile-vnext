import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AirPage } from './air';
import { HttpClientModule } from '@angular/common/http';
import { AirService } from '../../provider/services'
import { AirApiService } from '../../provider/airApiService';
import { ModulePageComponentModule } from '@espm/shared';

@NgModule({
  declarations: [
    AirPage,
  ],
  imports: [
    IonicPageModule.forChild(AirPage),
    HttpClientModule , ModulePageComponentModule
  ],
  providers: [
    AirService,AirApiService,
  ]
})
export class AirPageModule {}
