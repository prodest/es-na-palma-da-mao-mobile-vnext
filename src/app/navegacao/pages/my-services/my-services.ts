import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, App } from 'ionic-angular';
import { AuthQuery, AuthNeededService } from '@espm/core';
import deburr from 'lodash-es/deburr';
import { ItemMenu } from '../../models';
import { MenuService } from '../../providers/menu.service';
import { MenuToken } from '@espm/core/menu';
import { MenusQuery, MenusStore } from '../../providers';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-my-services',
  templateUrl: 'my-services.html'
})
export class MyServicesPage {
  private destroyed$ = new Subject();
  filteredMenus: ItemMenu[];
  private slides: Array<ItemMenu[]> = [];

  constructor(
    protected appCtrl: App,
    protected authQuery: AuthQuery,
    protected authNeeded: AuthNeededService,
    protected navCtrl: NavController,
    @Inject(MenuToken) private menus: ItemMenu[],
    private menuService: MenuService,
    private menusStore: MenusStore,
    private menuQuery: MenusQuery
  ) {
    this.menuQuery.favorites$
      .pipe(
        filter(() => !this.menusStore.isPristine),
        // tap(favorites$.map((elemento: ItemMenu, index: number) => {
        //   if (index % 4 === 0) {
        //     this.slides.push([]);
        //   }
        //   this.slides[this.slides.length - 1].push(elemento);
        // })),
        takeUntil(this.destroyed$),
      )
      .subscribe();

    this.menuService.loadMenu();

    this.filteredMenus = this.menuService.getMenus();
    this.filteredMenus.map((elemento: ItemMenu, index: number) => {
      if (index % 4 === 0) {
        this.slides.push([]);
      }
      this.slides[this.slides.length - 1].push(elemento);
    });
  }
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  /**
   *
   */

  openPage = (page: string, accessDenied: boolean = false) => {
    if (accessDenied) {
      this.authNeeded.showAuthNeededModal();
    } else {
      this.appCtrl.getRootNav().push(page);
    }
  };

  goToSelectFavorites() {
    this.navCtrl.push('SelectFavoritePage');
  }
  /**
   *
   */
  search = e => {
    const search = this.normalize(e.target.value);
    this.filteredMenus = this.menus.filter(select => {
      return this.normalize(select.title).includes(search) || this.normalize(select.title).includes(search);
    });
    console.log(this.filteredMenus);

    this.slides = [];
    this.filteredMenus.map((elemento: ItemMenu, index: number) => {
      if (index % 4 === 0) {
        this.slides.push([]);
      }
      this.slides[this.slides.length - 1].push(elemento);
    });
  };
  /**
   *
   */
  clear = () => {
    this.filteredMenus = [...this.filteredMenus];
  };
  /**
   *
   */
  private normalize = (term: string) => (term ? deburr(term.toLowerCase()) : '');
  /**
   *
   */
}
