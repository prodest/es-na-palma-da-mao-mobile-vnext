import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PageVisitorsPage } from './page-visitors';

@NgModule({
  declarations: [
    PageVisitorsPage,
  ],
  imports: [
    IonicPageModule.forChild(PageVisitorsPage),
  ],
})
export class PageVisitorsPageModule {}
