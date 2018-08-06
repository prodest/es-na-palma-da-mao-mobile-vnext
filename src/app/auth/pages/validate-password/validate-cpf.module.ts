import { NgModule } from '@angular/core';
import { ComponentsModule } from '@espm/shared/components/components.module';
import { IonicPageModule } from 'ionic-angular/umd';

import { ValidateCPFPage } from './validate-cpf';

@NgModule({
  declarations: [ValidateCPFPage],
  imports: [ComponentsModule, IonicPageModule.forChild(ValidateCPFPage)]
})
export class LoginPageModule {}
