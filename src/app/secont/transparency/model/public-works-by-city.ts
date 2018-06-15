import { ChartModel } from './chart';
import { PublicWorksByCityItem } from './public-works-by-city-item';

export interface PublicWorksByCity {
  city: string;
  total: number;
  items: PublicWorksByCityItem[];
  info: string;
  lastUpdate: string;
  chart: ChartModel;
  // decorate
  plotable: PublicWorksByCityItem[];
  listable: PublicWorksByCityItem[];
}
