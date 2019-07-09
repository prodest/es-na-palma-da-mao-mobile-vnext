import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetranServicePage } from './detran-service';

@NgModule({
  declarations: [
    DetranServicePage,
  ],
  imports: [
    IonicPageModule.forChild(DetranServicePage),
  ],
})
export class DetranServicePageModule {}
