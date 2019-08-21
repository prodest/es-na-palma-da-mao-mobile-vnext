import { Injectable, OnDestroy, Inject } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';
import { MenuApiService } from './menu-api-service';
import { MenusStore } from './menus-store';
import { MenusQuery } from './menus-query';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { takeUntil, filter, map, finalize, flatMap, tap } from 'rxjs/operators';
import { AuthQuery } from '@espm/core';
import { ItemMenu, FavoriteMenusData } from '../models';
import { of } from 'rxjs/observable/of';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { MenuToken } from '@espm/core/menu';

@Injectable()
export class MenuService implements OnDestroy {
  loading: Loading;

  private destroyed$ = new Subject();

  get menus$() {
    return this.menuQuery.menus$;
  }

  constructor(
    private api: MenuApiService,
    private loadingCtrl: LoadingController,
    private authQuery: AuthQuery,
    @Inject(MenuToken) private menus: ItemMenu[],
    private menusStore: MenusStore,
    private menuQuery: MenusQuery
  ) {
    // salva favoritos no server todas as vezes que os favoritos forem atualizados após o carregamento
    // inicial da loja
    this.menuQuery.favorites$
      .pipe(
        filter(() => !this.menusStore.isPristine),
        filter(() => this.authQuery.isLoggedIn),
        flatMap(this.saveFavorites),
        takeUntil(this.destroyed$)
      )
      .subscribe();

    this.authQuery.authChanged$
      .pipe(
        tap(this.loadMenuData),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  /**
   *
   */
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  loadMenu = (): void => {
    if (this.menusStore.isPristine) {
      this.loadMenuData();
    }
  }

  /**
   *
   */
  private loadMenuData = (): void => {
      const menus = [...this.menus];

      if (!this.authQuery.isLoggedIn) {
        this.storeMenus(menus);
        return;
      }

      this.showLoading();

      forkJoin(of(menus), this.api.getFavoriteMenusData())
        .pipe(
          map(this.markFavorites),
          finalize(this.dismissLoading)
        )
        .subscribe(this.storeMenus);
  };

  /**
   *
   */
  private markFavorites = ([menus, favorites]: [ItemMenu[], FavoriteMenusData]): ItemMenu[] => {
    return menus.map(item => {
      return {
        ...item,
        isChecked: favorites.favoriteMenus.some(idMenu => idMenu === item.id)
      };
    });
  };

  /**
   *
   */
  private saveFavorites = (favoriteMenus: ItemMenu[]): Observable<FavoriteMenusData> => {
    return this.api.saveFavoriteMenus({
      favoriteMenus: favoriteMenus.map(line => line.id),
      date: new Date().toISOString()
    });
  };

  /**
   *
   */
  toggleFavorite = (menu: ItemMenu): ItemMenu => {
    this.menusStore.update(menu.id, { isChecked: !menu.isChecked });
    return this.menuQuery.getEntity(menu.id);
  };

  /**
   *
   */
  storeMenus = (m: ItemMenu[]) => {
    this.menusStore.set(m);
  }

  /**
   * 
   */
  updateMenu = (id: number, isChecked: boolean) => {
    this.menusStore.update(id, { isChecked: isChecked })
  };

  /**
   * 
   * @param isChecked 
   */
  updateAll(isChecked: boolean) {
    this.menusStore.updateAll({ isChecked: isChecked });
  }

  /**
   *
   */
  getMenus = () => this.menuQuery.getAll();

  /**
   *
   *
   */
  private showLoading = (message: string = 'Aguarde') => {
    if (this.loading) {
      this.loading.setContent(message);
    } else {
      this.loading = this.loadingCtrl.create({ content: message, dismissOnPageChange: true });
      this.loading.present();
    }
  };

  /**
   *
   */
  private dismissLoading = () => {
    if (this.loading) {
      this.loading.dismiss().catch(console.log);
      this.loading = null;
    }
  };
}
