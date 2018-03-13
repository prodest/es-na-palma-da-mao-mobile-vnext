import { BusLine } from './bus-line'

export interface BusSchedule {
  line: BusLine
  departures: BusDeparture[]
  notes: LineNote[]
}

export interface BusDeparture {
  terminal: string
  dayGroups: DayGroups[]
}

export interface DayGroups {
  name: string
  beginDate: Date
  times: string[]
}
export interface LineNote {
  type: string
  description: string
}
