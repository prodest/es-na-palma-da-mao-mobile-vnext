import { MenusStore } from './menus-store';
import { MenusQuery } from './menus-query';
import { MenuApiService } from './menu-api-service';
import { MenuService } from './menu.service';

export { MenusStore, MenusQuery, MenuApiService, MenuService };

export const MenusProviders = [MenusStore, MenusQuery, MenuApiService, MenuService];
