import { EntityStore, EntityState, StoreConfig } from "@datorama/akita";
import { Usuario } from './usuario.model';
import { Injectable } from "@angular/core";

export interface UsuarioState extends EntityState<Usuario>{}

@Injectable()
@StoreConfig({name:"usuarios",idKey:"id"})
export class UsuariosStore extends EntityStore<UsuarioState,Usuario> {

}