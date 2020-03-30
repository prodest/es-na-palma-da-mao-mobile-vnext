import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SiarhesLinksComponent } from './siarhes-links.component';
import { LinksStatusComponentModule } from '../links-status';

@NgModule({
  declarations: [
    SiarhesLinksComponent,
  ],
  imports: [
    LinksStatusComponentModule,
    IonicPageModule,
  ],
  exports: [
    SiarhesLinksComponent,
  ]
})
export class SiarhesLinksComponentModule { }
