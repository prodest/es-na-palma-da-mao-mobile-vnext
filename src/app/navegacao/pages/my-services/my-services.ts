import { Component, Inject, OnDestroy } from '@angular/core';
import { IonicPage, NavController, App } from 'ionic-angular';
import { AuthQuery, AuthNeededService } from '@espm/core';
import deburr from 'lodash-es/deburr';
import { ItemMenu } from '../../models';
import { MenuService } from '../../providers/menu.service';
import { MenuToken } from '@espm/core/menu';
import { MenusQuery, MenusStore } from '../../providers';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@IonicPage()
@Component({
  selector: 'page-my-services',
  templateUrl: 'my-services.html'
})
export class MyServicesPage implements OnDestroy {

  private destroyed$ = new Subject();
  private favorites: ItemMenu[] = [];
  private slides: Array<Array<ItemMenu[]>> = [];
  private menuToShow$: Subject<ItemMenu[]>;
  private searching: boolean = false;

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

    /* Este Subject é responsável por atualizar a lista de módulos a serem exibidos */
    this.menuToShow$ = new Subject();
    this.menuToShow$.subscribe((menus: ItemMenu[]) => {
      this.updateSlides(menus);
    });

    this.menuQuery.favorites$
    .pipe(
      filter(() => !this.menusStore.isPristine),
      takeUntil(this.destroyed$))
    .subscribe((favorites: ItemMenu[]) => {
      /* Sempre que os favoritos mudam, atualizamos o "backup" e a lista de módulos para exibir */
      this.favorites = favorites;
      this.menuToShow$.next(favorites);
    });


    /* Primeira carga dos módulos */
    this.menuService.loadMenu();
    this.menuToShow$.next(this.menuService.getMenus());
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
  sortModules(moduleA, moduleB) {
    if (moduleA.isChecked === moduleB.isChecked) return 0;
    if (moduleA.isChecked && !moduleB.isChecked) return -1;
    if (!moduleA.isChecked && moduleB.isChecked) return 1;
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
    if (menus.length === 0 && !this.searching) _menus = this.menuService.getMenus();

    this.slides = [];
    _menus.map((elemento: ItemMenu, index: number) => {
      if (index%6 === 0) this.slides.push([]);
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
      this.menuToShow$.next(this.favorites);
      return;
    }

    this.searching = true; // indica que uma busca está em andamento
    let filteredMenus = this.menus.filter(select => {
      return this.normalize(select.title).includes(search) || this.normalize(select.title).includes(search);
    });
    console.log(filteredMenus);

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
