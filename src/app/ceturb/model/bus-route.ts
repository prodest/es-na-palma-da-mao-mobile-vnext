import { BusLine } from './bus-line'

export interface BusRoute {
  line: BusLine
  directions: BusDirection[]
}

export interface BusDirection {
  type: string
  paths: string[]
}
