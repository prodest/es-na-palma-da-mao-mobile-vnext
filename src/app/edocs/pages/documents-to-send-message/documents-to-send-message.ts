import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  segment: 'documentos-para-enviar-mensagem'
})
@Component({
  selector: 'documents-to-send-message',
  templateUrl: './documents-to-send-message.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DocumentsToSendMessagePage implements OnInit {

  message: string = ''

  constructor() { }

  ngOnInit(): void { }

  refresh(): void { }
}