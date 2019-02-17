import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

import { Document, DocumentsQuery, DocumentsService } from '../../state';
import { AuthQuery } from '@espm/core';

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
  userName: string;

  /**
   *
   */
  constructor(
    private docsService: DocumentsService,
    private docsQuery: DocumentsQuery,
    private viewCtrl: ViewController,
    private authQuery: AuthQuery
  ) {}

  /**
   *
   */
  ngOnInit() {
    this.userName = this.authQuery.state.claims.nome;
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
