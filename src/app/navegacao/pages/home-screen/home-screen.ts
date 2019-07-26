import { Component, OnInit, OnDestroy,ViewChild } from '@angular/core';
import { IonicPage, App, NavController,Slides } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { AuthQuery } from '@espm/core';
import { tap, takeUntil } from 'rxjs/operators';
import { AuthNeededService } from '@espm/core/auth/auth-needed.service';

@IonicPage()
@Component({
  selector: 'page-home-screen',
  templateUrl: 'home-screen.html'
})
export class HomeScreenPage implements OnInit, OnDestroy {
  @ViewChild('slides') slides: Slides;
  isLoggedIn: boolean;
  private destroyed$ = new Subject<boolean>();
  
  public markAll: boolean;
  
  headerContentWelcome: Array<string> = ['Bem vindo ao','Espírito Santo','na Palma da Mão'];
  headerContentAccess: Array<string> = ['Acesse','seus serviços','digitais'];
  
  constructor(
    private appCtrl: App,
    private authQuery: AuthQuery,
    private authNeeded: AuthNeededService,
    private navCtrl: NavController
  ) {
      
  }

  /**
  *
  */
  ngOnInit() {
    this.authQuery.isLoggedIn$
    .pipe(tap(() => takeUntil(this.destroyed$)))
    .subscribe(isLoggedIn => (this.isLoggedIn = isLoggedIn));
  }

  /**
  *            
  */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
  
  openPageLogin() {
    this.navCtrl.push('LoginPage');
  }

  /**
  * direciona para paginas de serviços pasando paramentros array menus
  */
  openPageMyServices() {
    this.navCtrl.push('MyServicesPage');
  }

  /*
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
  next() {
    // if (this.authQuery.isLoggedIn) {
    //   console.log("Entrou como logado")
    //   this.navCtrl.push('MyServicesPage');
    // }else{
    //   console.log("Nao logado")
       this.slides.slideNext();
    // }
    
    
  }  
}
