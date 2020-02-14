import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AirPage } from './air';

@NgModule({
  declarations: [
    AirPage,
  ],
  imports: [
    IonicPageModule.forChild(AirPage),
  ],
})
export class AirPageModule {}
