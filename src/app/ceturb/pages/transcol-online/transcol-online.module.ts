import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import {
  BetaRibbonComponentModule,
  FavoritesModule,
  GeolocationStatusModule,
  LinePrevisionsComponentModule,
  OriginPrevisionsComponentModule,
  RoutePrevisionsComponentModule,
  StopSummaryComponentModule
} from '../../components';
import { TranscolOnlinePage } from './transcol-online';

@NgModule({
  declarations: [TranscolOnlinePage],
  imports: [
    GeolocationStatusModule,
    OriginPrevisionsComponentModule,
    StopSummaryComponentModule,
    LinePrevisionsComponentModule,
    RoutePrevisionsComponentModule,
    BetaRibbonComponentModule,
    FavoritesModule,
    IonicPageModule.forChild(TranscolOnlinePage)
  ]
})
export class TranscolOnlinePageModule {}
