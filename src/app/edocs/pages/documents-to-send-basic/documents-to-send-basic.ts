import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  segment: 'documentos-para-enviar-basico'
})
@Component({
  selector: 'documents-to-send-basic',
  templateUrl: './documents-to-send-basic.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DocumentsToSendBasicPage implements OnInit{

  documents = [];
  roleOptions = {
    title: 'Cargo / Função',
    subTitle: 'Selecione o cargo ou a função que deseja capturar e encaminhar o documento atual'
  }

  senTitle: string = ''
  sender: string = ''
  role: string = ''

  constructor() { }

  ngOnInit(): void { }

  refresh(): void { }
}