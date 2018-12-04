import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

import { DefaultItemComponent } from './default-item.component';

@NgModule({
  imports: [IonicPageModule],
  declarations: [DefaultItemComponent],
  exports: [DefaultItemComponent]
})
export class DefaultItemComponentModule {}
