import * as moment from 'moment';

export class DateRangeFilter {
  year: number;
  from: Date;
  to: Date;
  fromISO: string;
  toISO: string;

  /**
   *.
   *
   */
  constructor(from: Date, to: Date) {
    this.from = moment(from)
      .startOf('month')
      .toDate();
    this.fromISO = this.from.toISOString();
    this.to = moment(to)
      .endOf('month')
      .toDate();
    this.toISO = this.to.toISOString();
  }

  /**
   *
   *
   */
  static currentYear() {
    return new DateRangeFilter(
      moment()
        .startOf('year')
        .toDate(),
      moment()
        .endOf('month')
        .toDate()
    );
  }

  updateFromISO() {
    this.from = moment(this.fromISO).toDate();
    this.to = moment(this.toISO).toDate();
  }

  /**
   *
   *
   */
  description() {
    const fromMonth = moment(this.from).format('MMM');
    const fromYear = moment(this.from).year();
    const toMonth = moment(this.to).format('MMM');
    const toYear = moment(this.to).year();

    // mês e ano iguais
    let desc = `${toMonth} de ${toYear}`;

    // anos diferentes
    if (fromYear !== toYear) {
      desc = `${fromMonth} de ${fromYear} a ${toMonth} de ${toYear}`;
    } else if (fromMonth !== toMonth) {
      // mesmo ano e meses diferentes
      desc = `${fromMonth} a ${toMonth} de ${toYear}`;
    }
    return desc;
  }
}
