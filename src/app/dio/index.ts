import { DioApiService } from './providers/dio-api.service';
import { DioService } from './providers/dio.service';
import { DioSearchPageModule } from './pages/dio-search/dio-search.module';
import { DioSearchFilterPageModule } from './pages/dio-search-filter/dio-search-filter.module';
import { LatestEditionsPageModule } from './pages/latest-editions/latest-editions.module';

export { DioApiService, DioService };
export { DioSearchPageModule, DioSearchFilterPageModule, LatestEditionsPageModule };

export const DioModules = [DioSearchFilterPageModule];
export const DioProviders = [DioApiService, DioService];
