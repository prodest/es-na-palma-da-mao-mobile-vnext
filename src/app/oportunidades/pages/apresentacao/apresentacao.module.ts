import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Apresentacao  } from './apresentacao';

@NgModule({
  declarations:[
    Apresentacao ,
  ],
  imports: [
    IonicPageModule.forChild(Apresentacao ),
  ],
})
export class ApresentacaoPageModule {}
