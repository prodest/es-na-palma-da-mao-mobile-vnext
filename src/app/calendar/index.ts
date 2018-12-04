import { CalendarApiService } from './providers/calendar-api.service';
import { CalendarPageModule } from './pages/calendar/calendar.module';
import { CalendarFilterPageModule } from './pages/calendar-filter/calendar-filter.module';

export { CalendarApiService };
export { CalendarPageModule, CalendarFilterPageModule };

export const CalendarModules = [CalendarPageModule, CalendarFilterPageModule];
export const CalendarProviders = [CalendarApiService];
