import { FeedBackApiService } from './feedback-api.service';
import { TranscolOnlineApiService } from './transcol-online-api.service';
import { TranscolOnlineService } from './transcol-online.service';
import { TranscolOnlineRealTimeService } from './transcol-online-real-time.service';

export { TranscolOnlineService, TranscolOnlineApiService, FeedBackApiService, TranscolOnlineRealTimeService };

export const TranscolOnlineProviders = [TranscolOnlineService, TranscolOnlineApiService, FeedBackApiService, TranscolOnlineRealTimeService];
