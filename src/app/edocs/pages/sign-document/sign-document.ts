import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

import { Document, DocumentsQuery, DocumentsService } from '../../state';

@IonicPage({
  segment: 'assinar-documento'
})
@Component({
  selector: 'edocs-sign-document-page',
  templateUrl: './sign-document.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class SignDocumentPage implements OnInit {
  document: Document;

  /**
   *
   */
  constructor(private docsService: DocumentsService, private docsQuery: DocumentsQuery, private viewCtrl: ViewController) {}

  /**
   *
   */
  ngOnInit() {
    this.document = this.docsQuery.getActive();
  }

  /**
   *
   */
  sign = (document: Document) => {
    this.docsService.sign(document);
    this.dismiss();
  };

  /**
   *
   *
   */
  dismiss = (contactInfo?: any) => this.viewCtrl.dismiss(contactInfo);
}
