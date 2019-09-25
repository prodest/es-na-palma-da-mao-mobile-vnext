import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'restrict' })
export class RestrictPipe implements PipeTransform {
  transform(value: { restrict: boolean }[], agentePublico: boolean): any {
    if (!value || typeof agentePublico === 'undefined') {
      return value;
    }
    return value.filter(value => value.restrict ? agentePublico : true);
  }
}
