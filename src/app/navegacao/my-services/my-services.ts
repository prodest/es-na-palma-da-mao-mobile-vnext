import { Component } from '@angular/core';
import { IonicPage, NavController, App, NavParams } from 'ionic-angular';
import { AuthQuery, AuthNeededService } from '@espm/core';
import deburr from 'lodash-es/deburr';

type Favorite = {
  title: string;
  icon: string;
  component: string;
  isChecked: boolean;
  secure?: boolean;
  url?: string;
  name?: string;
  deepLink?: boolean;
  package?: string;
  uriScheme?: string;
}

@IonicPage()
@Component({
  selector: 'page-my-services',
  templateUrl: 'my-services.html',
})
export class MyServicesPage{
    
    
    filteredMenus: Favorite[];
    private slides: Array<Favorite[]> = [];
    allMenus: Favorite[];
   
    constructor(
    protected appCtrl: App,
    protected authQuery: AuthQuery,
    protected authNeeded: AuthNeededService,
    protected navCtrl: NavController,
    private navParams: NavParams) {

      this.allMenus = this.navParams.data;
      this.filteredMenus = this.allMenus;
      this.filteredMenus.map((elemento: Favorite, index: number) => {
        if (index%4 === 0) {
          this.slides.push([])
        }
        this.slides[this.slides.length-1].push(elemento);
      });
      
      
  }
  openPage = (page: string, accessDenied: boolean = false) => {
    if (accessDenied) {
      this.authNeeded.showAuthNeededModal();
    } else {
      this.appCtrl.getRootNav().push(page);
    }
  };
  goToSelectFavorites(){
    this.navCtrl.push('SelectFavoritePage')
  }
  /**
   *
   */
  search = e => {
    const search = this.normalize(e.target.value);
    this.filteredMenus = this.allMenus.filter(select => {
        return this.normalize(select.title).includes(search) || this.normalize(select.title).includes(search); 
      
    });
    console.log(this.filteredMenus);
    
    this.slides = []
    this.filteredMenus.map((elemento: Favorite, index: number) => {
      if (index%4 === 0) {
        this.slides.push([])
      }
      this.slides[this.slides.length-1].push(elemento);
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
  

}
