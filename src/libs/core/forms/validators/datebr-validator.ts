import { AbstractControl } from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function date(control: AbstractControl): { [key: string]: boolean } {
  let check = false;

  if (!control.value) {
    return null;
  }

  const value = control.value.toString().replace(/_/g, '');
  const REGEX_DATE = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

  if (!REGEX_DATE.test(value)) {
    check = false;
  }

  const [, day, month, year] = value.match(/(\d{1,2})?\/(\d{1,2})?\/(\d{1,4})?/);
  const gg = parseInt(day, 10);
  const mm = parseInt(month, 10);
  const aaaa = parseInt(year, 10);

  // test if is valid date
  const xdata = new Date(aaaa, mm - 1, gg);
  if (xdata.getFullYear() === aaaa && xdata.getMonth() === mm - 1 && xdata.getDate() === gg) {
    check = true;
  } else {
    check = false;
  }
  return check ? null : { date: true };
}
