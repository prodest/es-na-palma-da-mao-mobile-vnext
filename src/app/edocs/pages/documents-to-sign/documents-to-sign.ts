import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage({
  segment: 'documentos'
})
@Component({
  selector: 'documents-to-sign',
  templateUrl: './documents-to-sign.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentsToSignPage {
  /**
   *
   */
  constructor(private navCtrl: NavController) {}

  /**
   *
   */
  openPage(page: string) {
    this.navCtrl.push(page);
  }
}
