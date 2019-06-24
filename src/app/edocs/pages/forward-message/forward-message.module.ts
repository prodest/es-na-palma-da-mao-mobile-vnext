import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForwardMessagePage } from './forward-message';
import { ForwardHeaderComponentModule } from '../../components/forward-header/forward-header.component.module';
import { ForwardFooterComponentModule } from '../../components/forward-footer/forward-footer.component.module';

@NgModule({
  declarations: [ForwardMessagePage],
  imports: [
    ForwardHeaderComponentModule,
    ForwardFooterComponentModule,
    IonicPageModule.forChild(ForwardMessagePage),
  ],
})
export class ForwardMessagePageModule {}