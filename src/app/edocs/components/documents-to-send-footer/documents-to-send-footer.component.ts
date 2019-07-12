import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'edocs-documents-to-send-footer',
  templateUrl: './documents-to-send-footer.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DocumentsToSendFooterComponent {
  @Output() onNextClick: EventEmitter<void> = new EventEmitter();
}
