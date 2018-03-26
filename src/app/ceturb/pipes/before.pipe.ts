import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'before'
})
export class BeforePipe implements PipeTransform {
  /**
   *
   */
  transform(fromTime: string, targetTime: string) {
    return fromTime.slice(0, 5).localeCompare(targetTime) === -1;
  }
}
