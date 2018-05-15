import { NewsApiService } from './providers/news-api.service';
import { NewsListPageModule } from './pages/list/news-list.module';
import { NewsListFilterPageModule } from './pages/list-filter/news-list-filter.module';
import { NewsDetailsPageModule } from './pages/details/news-details.module';
import { NewsHighlightsPageModule } from './pages/highlights/news-highlights.module';

export { NewsApiService };
export { NewsListPageModule, NewsListFilterPageModule, NewsDetailsPageModule, NewsHighlightsPageModule };

export const NewsModules = [NewsListPageModule, NewsListFilterPageModule, NewsDetailsPageModule, NewsHighlightsPageModule];
export const NewsProviders = [NewsApiService];
