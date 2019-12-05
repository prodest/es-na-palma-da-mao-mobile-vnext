import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalhesDenunciaPage } from './detalhes-denuncia';
import { ModulePageComponentModule } from '@espm/shared';

@NgModule({
  declarations: [
    DetalhesDenunciaPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalhesDenunciaPage),
    ModulePageComponentModule,
  ],
})
export class DetalhesDenunciaPageModule {}
