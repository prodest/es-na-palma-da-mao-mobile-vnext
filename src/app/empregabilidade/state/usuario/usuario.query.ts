import { QueryEntity, QueryConfig } from "@datorama/akita";
import { UsuarioState, UsuariosStore } from "./usuario.store";
import { Usuario } from "./usuario.model";
import { Injectable } from "@angular/core";

@QueryConfig({})
@Injectable()
export class UsuarioQuery extends QueryEntity<UsuarioState,Usuario> {

    constructor(protected store: UsuariosStore) {
        super(store);
    }

}