import { Pipe, PipeTransform } from '@angular/core'
import * as moment from 'moment'

@Pipe({
  name: 'fromNow'
})
export class FromNowPipe implements PipeTransform {
  /**
   *
   */
  transform(value, startOfDay) {
    return this.fromNow(value, startOfDay)
  }

  /**
   *
   */
  fromNow = (value, startOfDay) => {
    let date = moment(value)
    if (!date || !date.isValid()) {
      return value
    }
    if (startOfDay) {
      return date.from(moment().startOf('day'))
    }
    return date.fromNow()
  }
}
