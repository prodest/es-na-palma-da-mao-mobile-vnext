import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { IonicPage} from 'ionic-angular';

@IonicPage({
  segment: 'documentos-para-enviar'
})
@Component({
  selector: 'documents-to-send',
  templateUrl: './documents-to-send.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DocumentsToSendPage implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  refresh(): void { }
}
