import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ModulePageComponentModule } from '@espm/shared/components';
import { QualidadeMapaPage } from './qualidade-mapa';

@NgModule({
  declarations: [QualidadeMapaPage],
  imports: [IonicPageModule.forChild(QualidadeMapaPage), ModulePageComponentModule]
})
export class QualidadeMapaPageModule {}
