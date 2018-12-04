import { Pipe, PipeTransform } from '@angular/core';
import uniqBy from 'lodash-es/uniqBy';

@Pipe({
  name: 'uniqueBy'
})
export class UniqueByPipe implements PipeTransform {
  /**
   *
   */
  transform(value: any[], id: any) {
    return uniqBy(value, id);
  }
}
