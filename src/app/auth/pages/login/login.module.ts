import { NgModule } from '@angular/core';
import { ComponentsModule } from '@espm/shared/components/components.module';
import { NoMenuDirectiveModule } from '@espm/shared/directives';
import { IonicPageModule } from 'ionic-angular';

import { LargeButtonComponentModule, NavTitleComponentModule } from '@espm/shared/components';

import { LoginPage } from './login';

@NgModule({
  declarations: [LoginPage],
  imports: [
    ComponentsModule,
    LargeButtonComponentModule,
    NavTitleComponentModule,
    NoMenuDirectiveModule,
    IonicPageModule.forChild(LoginPage)
  ]
})
export class LoginPageModule {}
