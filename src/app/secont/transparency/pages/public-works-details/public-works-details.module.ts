import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicWorksDetailsPage } from './public-works-details';
import { ReportTitleComponentModule, PublicWorkStatusComponentModule } from '../../components';

@NgModule({
  declarations: [PublicWorksDetailsPage],
  imports: [IonicPageModule.forChild(PublicWorksDetailsPage), ReportTitleComponentModule, PublicWorkStatusComponentModule]
})
export class PublicWorksDetailsPageModule {}
