import { NgModule } from '@angular/core';
import { ComponentsModule } from '@espm/shared/components/components.module';
import { IonicPageModule } from 'ionic-angular/umd';

import { ResetPasswordPage } from './reset-password';

@NgModule({
  declarations: [ResetPasswordPage],
  imports: [ComponentsModule, IonicPageModule.forChild(ResetPasswordPage)]
})
export class LoginPageModule {}
