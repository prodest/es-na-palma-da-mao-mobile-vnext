import { UsuariosStore } from "./usuario.store";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Usuario, createUsuario } from "./usuario.model";

@Injectable()
export class UsuarioService{
    constructor(protected store: UsuariosStore,private http:HttpClient){

    }
  
    loadUsuarios(){
        this.http.get('http://jsonplaceholder.typicode.com/posts')
        .pipe(
            map(
                (usuarios: Usuario[]) => {
                    return usuarios.map(
                        usuario => usuario = createUsuario(usuario)
                    );
                }
            )
        )
        .subscribe(result =>{
          this.store.set(result);
        });
    }
}