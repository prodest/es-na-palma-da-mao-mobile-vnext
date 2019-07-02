import { Component, OnDestroy } from '@angular/core';
import { IonicPage, App, NavController } from 'ionic-angular';
import { AuthQuery } from '@espm/core';
import { AuthNeededService } from '@espm/core/auth/auth-needed.service';
import { ItemMenu } from '../../models';
import { MenuService } from '../../providers/menu.service';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-select-favorite',
  templateUrl: 'select-favorite.html'
})
export class SelectFavoritePage implements OnDestroy {
  public noticias = '../assets/imgs/bg-menu-principal-topo (1).jpg';
  isLoggedIn: boolean;
  public markAll: boolean;

  private destroyed$ = new Subject();

  public menus: Array<ItemMenu> = [];

  constructor(
    protected appCtrl: App,
    protected authQuery: AuthQuery,
    protected authNeeded: AuthNeededService,
    protected navCtrl: NavController,
    private menuService: MenuService
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
  markItem(item, value) {
    this.menuService.updateMenu(item.id, value);
    console.log(this.menus);
  }
  
  /**
   * // marcar e desmarcar todos os checkebox
   */

  markUncheckList() {
    if (this.markAll === true) {
      this.menus = this.checkAllItemMenu(true);
    } else {
      this.menus = this.checkAllItemMenu(false);
    }
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
    this.back();
  }

   /**
   *
   */
  back() {
    this.navCtrl.pop();
  }
}
