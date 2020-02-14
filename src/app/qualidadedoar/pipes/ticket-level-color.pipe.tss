import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ticketLevelColor'
})
export class TicketLevelColorPipe implements PipeTransform {
  private levelsMap = {
    leve: 'green',
    média: '#fdc44a',
    media: '#fdc44a',
    grave: '#F44336',
    gravíssima: 'black',
    gravissima: 'black'
  };

  /**
   *
   */
  transform(value: string) {
    return this.getTicketLevelColor(value);
  }

  /**
   * Obtem a cor relativa à uma classificação de multa. Usado somente na interface.
   */
  getTicketLevelColor(levelName: string): string {
    levelName = levelName.trim().toLowerCase();
    let color = this.levelsMap[levelName];
    return color || '';
  }
}
