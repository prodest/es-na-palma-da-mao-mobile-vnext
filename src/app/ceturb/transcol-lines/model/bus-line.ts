import { BusRoute, BusSchedule } from './';

export interface BusLine {
  number: string;
  name: string;
  nameFolded: string;
  isFavorite: boolean;
  route?: BusRoute;
  schedule?: BusSchedule;
}
