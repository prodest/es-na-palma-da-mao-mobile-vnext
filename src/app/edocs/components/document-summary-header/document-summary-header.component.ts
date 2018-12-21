import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'edocs-document-summary-header',
  templateUrl: './document-summary-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentHeaderComponent {
  @Input() isBloqueadoParaAssinaturas: boolean;
  @Input() soFaltaOUsuarioSeManifestar: boolean;
  @Input() paginas: number;
  @Input() tamanho: string;
  @Input() nome: string;
}
