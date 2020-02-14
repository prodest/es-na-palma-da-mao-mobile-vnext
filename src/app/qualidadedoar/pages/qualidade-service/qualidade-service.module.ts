import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ModuleIndexComponentModule  } from '@espm/shared/components';
import { QualidadeServicePage } from './qualidade-service';

@NgModule({
  declarations: [
    QualidadeServicePage,
  ],
  imports: [
    IonicPageModule.forChild(QualidadeServicePage),
    ModuleIndexComponentModule
  ],
})
export class QualidadeServicePageModule {}
