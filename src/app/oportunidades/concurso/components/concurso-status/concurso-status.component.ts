import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'concurso-status',
  templateUrl: './concurso-status.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConcursoStatusComponent {
  @Input() status;
}
