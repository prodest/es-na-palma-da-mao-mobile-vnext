import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardFavoritePage } from './dashboard-favorite';

@NgModule({
  declarations: [
    DashboardFavoritePage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardFavoritePage),
  ],
})
export class DashboardFavoritePageModule {}
