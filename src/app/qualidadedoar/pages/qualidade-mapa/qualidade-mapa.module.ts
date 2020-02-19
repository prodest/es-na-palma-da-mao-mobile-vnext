import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ModulePageComponentModule } from '@espm/shared/components';
import { QualidadeMapaPage } from './qualidade-mapa';
import { QualidadedoArApi } from '../../providers/api-qualidadedoar.service';
import { QualidadedoArService } from '../../providers/qualidadedoar.service';

@NgModule({
  declarations: [QualidadeMapaPage],
  imports: [IonicPageModule.forChild(QualidadeMapaPage), ModulePageComponentModule],
  providers:[
    QualidadedoArApi, QualidadedoArService
  ]
})
export class QualidadeMapaPageModule {}
