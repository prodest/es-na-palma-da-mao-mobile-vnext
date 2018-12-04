import { BusLinesQuery } from './bus-lines.query';
import { BusLinesService } from './bus-lines.service';
import { BusLinesStore } from './bus-lines.store';
import { CeturbApiService } from './ceturb-api.service';

export { CeturbApiService, BusLinesStore, BusLinesQuery, BusLinesService };

export const CeturbProviders = [CeturbApiService, BusLinesStore, BusLinesQuery, BusLinesService];
