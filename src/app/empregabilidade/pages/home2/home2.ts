import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UsuarioService, UsuarioQuery, Usuario } from '../../state/usuario';
import { Order } from '@datorama/akita';

@IonicPage()
@Component({
  selector: 'page-home2',
  templateUrl: 'home2.html',
})
export class Home2Page {
 
  public items: any;
  public idem: any;
  public ides: any;
  private usuarios$: Observable<Usuario[]>;

  
  constructor(
    public http: HttpClient,
    public navCtrl: NavController,
    public usuarioService: UsuarioService,
    public usuarioQuery: UsuarioQuery
    ) {
      this.usuarios$= this.usuarioQuery.selectAll();// exibe na tela 
  }

  ionViewWillLoad(){
    this.usuarioService.loadUsuarios();
  }

  buscarUsuario(id){
    this.usuarios$ = this.usuarioQuery.selectAll({
      filterBy: [
        (entity) => entity.userId == id,
      ],
      sortBy:'id',
      sortByOrder: Order.DESC
    });
  }
}


