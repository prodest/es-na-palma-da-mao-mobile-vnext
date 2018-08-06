import { NgModule } from '@angular/core';
import { ComponentsModule } from '@espm/shared/components/components.module';
import { IonicPageModule } from 'ionic-angular/umd';

import { CreateUserPage } from './create-user';

@NgModule({
  declarations: [CreateUserPage],
  imports: [ComponentsModule, IonicPageModule.forChild(CreateUserPage)]
})
export class LoginPageModule {}
