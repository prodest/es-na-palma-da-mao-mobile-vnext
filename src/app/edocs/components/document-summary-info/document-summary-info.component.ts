import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'edocs-document-summary-info',
  templateUrl: './document-summary-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentInfoComponent {
  @Input() papelAssinatura: string;
  @Input() capturador: string;
  @Input() dataEnvioLabel: string;
}
