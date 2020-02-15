import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';


import { ModulePageComponentModule } from '@espm/shared/components';
import { MapaQualidadePage } from './mapa-qualidade';

@NgModule({
  declarations: [MapaQualidadePage],
  imports: [IonicPageModule.forChild(MapaQualidadePage), ModulePageComponentModule]
})
export class MapaQualidadePageModule {}
