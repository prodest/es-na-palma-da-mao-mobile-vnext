import { BudgetDeviationItem } from './budget-deviation-item';
import { ChartModel } from './chart';

export interface BudgetDeviation {
  expected: number;
  executed: number;
  percentage: number;
  info: string;
  lastUpdate: string;
  items: BudgetDeviationItem[];
  // decorate
  plotable: BudgetDeviationItem[];
  listable: BudgetDeviationItem[];
  chart: ChartModel;
}
