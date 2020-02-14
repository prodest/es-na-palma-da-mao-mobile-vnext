import { Injectable } from "@angular/core";
import { share } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Environment } from "@espm/core";
import { Mapa } from "../model/mapa.model";



@Injectable()
export class SelecaoApiService {

    constructor(private http: HttpClient, private env: Environment){

    }

getAllItems = (): Observable<Mapa[]> => {
    return this.http.get<Mapa[]>(this.env.api.airQuality).pipe(share());
  };

}