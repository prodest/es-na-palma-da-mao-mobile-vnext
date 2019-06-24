import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForwardBasicPage } from './forward-basic';
import { ForwardHeaderComponentModule } from '../../components/forward-header/forward-header.component.module';
import { ForwardFooterComponentModule } from '../../components/forward-footer/forward-footer.component.module';

@NgModule({
  declarations: [ForwardBasicPage],
  imports: [
    ForwardHeaderComponentModule,
    ForwardFooterComponentModule,
    IonicPageModule.forChild(ForwardBasicPage),
  ],
})
export class ForwardBasicPageModule {}