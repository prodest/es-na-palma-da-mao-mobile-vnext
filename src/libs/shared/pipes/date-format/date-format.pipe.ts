import { DatePipe } from '@angular/common'
import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'dateFormat' })
export class DateFormatPipe implements PipeTransform {
  /**
   * Creates an instance of DateBRPipe.
   */
  constructor(private datePipe: DatePipe) {}

  /**
   *
   *
   */
  public transform(dateString?: string, format = 'dd/MM/yyyy HH:mm'): any {
    if (!dateString) {
      return ''
    }
    return this.datePipe.transform(new Date(dateString), format)
  }
}
