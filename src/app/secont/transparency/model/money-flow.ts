import { ChartModel } from './chart';
import { MoneyFlowItem } from './money-flow-item';
import { Report } from './transparency.page';

export interface MoneyFlow extends Report {
  items: MoneyFlowItem[];
  total: number;
  info: string;
  lastUpdate: string;
  // decoratwe
  plotable: MoneyFlowItem[];
  listable: MoneyFlowItem[];
  chart: ChartModel;
}
