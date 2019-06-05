import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApresentacaoPage  } from './apresentacao';

@NgModule({
  declarations:[
    ApresentacaoPage ,
  ],
  imports: [
    IonicPageModule.forChild(ApresentacaoPage),
  ],
})
export class ApresentacaoPageModule {}
