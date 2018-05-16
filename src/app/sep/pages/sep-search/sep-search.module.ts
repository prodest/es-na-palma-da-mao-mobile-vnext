import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SepSearchPage } from './sep-search';
import { ComponentsModule } from './../../components';
@NgModule({
  declarations: [SepSearchPage],
  imports: [ComponentsModule, IonicPageModule.forChild(SepSearchPage)]
})
export class SepSearchPageModule {}
