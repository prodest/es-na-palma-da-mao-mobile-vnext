import * as moment from 'moment';

export class YearFilter {
  year: number;
  fromISO: string;
  toISO: string;

  /**
   *
   *
   */
  constructor(year: number) {
    this.year = year;
  }

  /**
   *
   *
   */
  static currentYear(): YearFilter {
    return new YearFilter(moment().year());
  }

  /**
   * Just to use in conjunction with DateRangeFilter
   */
  updateFromISO() {}

  /**
   *
   *
   */
  description() {
    return `Ano de ${this.year}`;
  }
}
