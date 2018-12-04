import { ChartModel } from './chart';
import { PublicWorksItem } from './public-works-item';
import { Report } from './transparency.page';

export interface PublicWorks extends Report {
  total: number;
  quantity: number;
  items: PublicWorksItem[];
  info: string;
  lastUpdate: string;
  plotable: PublicWorksItem[];
  listable: PublicWorksItem[];
  chart: ChartModel;
}
