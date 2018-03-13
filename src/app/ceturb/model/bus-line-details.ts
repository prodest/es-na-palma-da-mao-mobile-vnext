import { BusRoute } from './bus-route'
import { BusSchedule } from './bus-schedule'

export interface BusLineDetails {
  route: BusRoute
  schedule: BusSchedule
}
