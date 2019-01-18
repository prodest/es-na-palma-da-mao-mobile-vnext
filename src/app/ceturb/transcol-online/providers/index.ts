import { FeedBackApiService } from './feedback-api.service';
import { TranscolOnlineApiService } from './transcol-online-api.service';
import { TranscolOnlineService } from './transcol-online.service';
import { TranscolOnlineRealTimeService } from './transcol-online-real-time.service';
import { ApiCeturbV2Service } from './api-ceturb-v2.service';

export { TranscolOnlineService, TranscolOnlineApiService, FeedBackApiService, TranscolOnlineRealTimeService, ApiCeturbV2Service };

export const TranscolOnlineProviders = [TranscolOnlineService, TranscolOnlineApiService, FeedBackApiService, TranscolOnlineRealTimeService, ApiCeturbV2Service];
