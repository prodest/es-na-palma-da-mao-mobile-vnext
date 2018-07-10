import * as moment from 'moment';

export class YearFilter {
  public year: number;

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
  public static currentYear(): YearFilter {
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
  public description() {
    return `Ano de ${this.year}`;
  }
}
