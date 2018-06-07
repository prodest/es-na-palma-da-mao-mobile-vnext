import { FeedBackApiService } from './feedback-api.service';
import { TranscolOnlineApiService } from './transcol-online-api.service';
import { TranscolOnlineService } from './transcol-online.service';

export { TranscolOnlineService, TranscolOnlineApiService, FeedBackApiService };

export const TranscolOnlineProviders = [TranscolOnlineService, TranscolOnlineApiService, FeedBackApiService];
