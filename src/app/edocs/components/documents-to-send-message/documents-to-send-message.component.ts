import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
  selector: 'edocs-documents-to-send-message',
  templateUrl: './documents-to-send-message.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DocumentsToSendMessageComponent implements OnInit {

  message: string = ''

  constructor() { }

  ngOnInit(): void { }

  refresh(): void { }
}