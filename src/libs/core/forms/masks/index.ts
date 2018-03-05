export const CNPJ_MASK = [
  /\d/,
  /\d/,
  '.',
  /\d/,
  /\d/,
  /\d/,
  '.',
  /\d/,
  /\d/,
  /\d/,
  '/',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/
]

export const CPF_MASK = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]

export const CEP_MASK = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]

export const PHONE_MASK = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

export const CELL_PHONE_MASK = ['(', /\d/, /\d/, ')', ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

export const PLATE_MASK = [/[A-Za-z]/, /[A-Za-z]/, /[A-Za-z]/, /\d/, /\d/, /\d/, /\d/]

export const YEAR_MASK = [/[1|2]/, /[0|9]/, /[0-9]/, /[0-9]/]

export const CREDICARD_MASK = [
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' '
]

export const CVV_MASK = [/\d/, /\d/, /\d/]

export const EXPIRATION_MASK = [/[0|1]/, /\d/, '/', /\d/, /\d/]

export const DATE_MASK = [/[0-3]/, /\d/, '/', /[0|1]/, /\d/, '/', /[1|2]/, /[0|9]/, /[0-9]/, /[0-9]/]

export const HOUR_MASK = [/[0|1|2]/, /[0-9]/, ':', /[0-6]/, /[0-9]/]
