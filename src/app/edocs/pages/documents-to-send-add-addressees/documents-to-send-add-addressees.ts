import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  segment: 'documentos-para-enviar-adicionar-destinatarios'
})
@Component({
  selector: 'documents-to-send-add-addressees',
  templateUrl: './documents-to-send-add-addressees.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DocumentsToSendAddAddresseesPage implements OnInit {

  // addressees: string = ''

  // constructor() { }

  ngOnInit(): void { }

  // refresh(): void { }
}