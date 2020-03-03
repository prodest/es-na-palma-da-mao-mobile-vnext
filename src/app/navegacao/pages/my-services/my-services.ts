import { Component, Inject, OnDestroy } from '@angular/core';
import { IonicPage, NavController, App } from 'ionic-angular';
import { AuthQuery, AuthNeededService } from '@espm/core';
import deburr from 'lodash-es/deburr';
import { ItemMenu } from '../../models';
import { MenuService } from '../../providers/menu.service';
import { MenuToken } from '@espm/core/menu';
import { MenusQuery } from '../../providers';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@IonicPage()
@Component({
  selector: 'page-my-services',
  templateUrl: 'my-services.html'
})
export class MyServicesPage implements OnDestroy {

  slides: Array<Array<ItemMenu[]>> = [];
  private destroyed$ = new Subject();
  private favorites: ItemMenu[] = [];
  private menuToShow$: Subject<ItemMenu[]>;
  private searching: boolean = false;

  constructor(
    protected appCtrl: App,
    protected authQuery: AuthQuery,
    protected authNeeded: AuthNeededService,
    protected navCtrl: NavController,
    @Inject(MenuToken) private menus: ItemMenu[],
    private menuService: MenuService,
    private menuQuery: MenusQuery
  ) {

    this.menuToShow$ = new Subject();
    this.menuToShow$.subscribe(this.updateSlides);

    this.menuQuery.favorites$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((favorites: ItemMenu[]) => {
        this.favorites = favorites;
        if (favorites.length > 0) {
          this.menuToShow$.next(favorites);
        } else {
          this.menuToShow$.next([...this.menus]);
        }
      });

    /* Primeira carga dos módulos */
    this.menuService.loadMenu();
  }

  /**
   *
   */
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

  /**
   *
   */
  goToSelectFavorites() {
    this.navCtrl.push('SelectFavoritePage')
  }

  /**
   *
   */
  updateSlides = (menus: ItemMenu[]) => {
    let _menus: ItemMenu[] = menus;

    /* Se o array fornecido estiver vazio, todos os módulos serão exibidos, a menos que seja o resultado de uma busca */
    if (menus.length === 0 && !this.searching) _menus = this.menus;

    this.slides = [];
    _menus.forEach((elemento: ItemMenu, index: number) => {
      if (index % 6 === 0) this.slides.push([]);
      let lastSlideIndex: number = this.slides.length - 1;

      if (index % 2 === 0) this.slides[lastSlideIndex].push([]);
      let lastLineIndex: number = this.slides[lastSlideIndex].length - 1;

      this.slides[lastSlideIndex][lastLineIndex].push(elemento);
    });
  }

  /**
   *
   */
  search = e => {

    const search = this.normalize(e.target.value);

    /* Se a busca estiver vazia, torna a exibir os favoritos */
    if (search === '') {
      this.clear();
      return;
    }

    this.searching = true; // indica que uma busca está em andamento
    let filteredMenus = this.menus.filter(select => {
      return this.normalize(select.title).includes(search);
    });

    this.menuToShow$.next(filteredMenus);
    this.searching = false; // finaliza a busca
  };

  /**
   *
   */
  clear = () => {
    this.menuToShow$.next(this.favorites);
  };

  /**
   *
   */
  private normalize = (term: string) => (term ? deburr(term.toLowerCase()) : '');
}