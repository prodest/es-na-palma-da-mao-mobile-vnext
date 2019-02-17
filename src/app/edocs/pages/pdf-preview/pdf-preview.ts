import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { Document, DocumentsQuery, DocumentsService } from '../../state';

@IonicPage({
  segment: 'preview'
})
@Component({
  selector: 'edocs-pdf-preview-page',
  templateUrl: './pdf-preview.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class PdfPreviewPage implements OnInit {
  document: Document;

  /**
   *
   */
  constructor(private docsService: DocumentsService, private docsQuery: DocumentsQuery) {}

  /**
   *
   */
  ngOnInit() {
    this.document = this.docsQuery.getActive();
  }

  /**
   *
   */
  download = (document: Document) => {
    this.docsService.generateUrl(document).subscribe((url: string) => {
      window.open(url, '_system');
    });
  };
}
