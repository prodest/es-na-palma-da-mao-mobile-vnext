import { Component, OnDestroy } from '@angular/core';
import { IonicPage, App, NavController } from 'ionic-angular';
import { AuthQuery } from '@espm/core';
import { AuthNeededService } from '@espm/core/auth/auth-needed.service';
import { ItemMenu } from '../../models';
import { MenuService } from '../../providers/menu.service';
import { Subject } from 'rxjs/Subject';
import { takeUntil, tap } from 'rxjs/operators';
import { MenusQuery } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-select-favorite',
  templateUrl: 'select-favorite.html'
})
export class SelectFavoritePage implements OnDestroy {
  isLoggedIn: boolean;
  public markAll: boolean;

  private destroyed$ = new Subject();

  public menus: Array<ItemMenu> = [];

  headerContent: Array<string> = ['Selecione os', 'seus serviços', 'favoritos'];

  constructor(
    protected appCtrl: App,
    protected authQuery: AuthQuery,
    protected authNeeded: AuthNeededService,
    protected navCtrl: NavController,
    private menuService: MenuService,
    private menusQuery: MenusQuery
  ) {
    
  }
  
  /**
   *  atualiza "menus" com os dados menuQuery
   */
  ionViewWillLoad() {
    this.menuService.menus$
    .pipe(
      takeUntil(this.destroyed$),
      tap(menus => (this.menus = menus || []))
    )
    .subscribe();

    this.menusQuery.favorites$
    .pipe(
      takeUntil(this.destroyed$),
      tap(favorites => this.markAll = favorites.length === this.menus.length)
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

  /**
   * seleciona os serviços favoritos
   */
  markItem(item: ItemMenu, value: boolean) {
    this.menuService.updateMenu(item.id, value);
    console.log(this.menus);
  }
  
  /**
   * marcar e desmarcar todos os checkbox
   */
  markUncheckList() {
    if (this.markAll === true) {
      this.menus = this.checkAllItemMenu(true);
    } else {
      this.menus = this.checkAllItemMenu(false);
    }

    this.saveFavorites();
  }

  /**
   *
   * @param value
   */
  private checkAllItemMenu(value: boolean) {
    console.log('ALL>>', value);
    return this.menus.map((item: ItemMenu) => Object.assign({}, item, { isChecked: value }));
  }

  /**
   *
   */
  saveFavorites() {
    this.menuService.storeMenus(this.menus);
    console.log('AKI>>>>>>>>>>======  ', this.menus);
    // this.back();
  }

  /**
   *
   */
  back() {
    this.navCtrl.pop();
  }
}
