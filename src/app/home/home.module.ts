import { NgModule } from '@angular/core';
import { NoMenuDirectiveModule } from '@espm/shared/directives';
import { IonicPageModule } from 'ionic-angular';

import { HomePage } from './home';

@NgModule({
  declarations: [HomePage],
  imports: [NoMenuDirectiveModule, IonicPageModule.forChild(HomePage)]
})
export class HomePageModule {}
