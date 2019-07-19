import { Component, Input } from '@angular/core';

@Component({
  selector: 'large-button',
  templateUrl: 'large-button.component.html'
})
export class LargeButtonComponent {
  /**
   * Inputs do componente:
   * leftIcon: Ícone que ficará à esquerda do botão
   * rightIcon: Ícone que ficará à direita do botão
   * text: o conteúdo do botão
   * color: o esquema de cores a ser usado conforme os guidelines
   */
  @Input() leftIcon: string;
  @Input() rightIcon: string;
  @Input() text: string;
  @Input() color: string;
  
  constructor() {}
}
