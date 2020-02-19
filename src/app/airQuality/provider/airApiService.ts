import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Environment, EnvVariables } from "@espm/core";
import { Mapa } from "../model/mapa.model";
import { share } from "rxjs/operators";
import { MapaId } from "../model/mapaId.model";



@Injectable()
export class AirApiService {

  constructor(private http: HttpClient, @Inject(EnvVariables) private env: Environment) {

  }
  /**
   * 
   */
  getAllItems = (): Observable<Mapa[]> => {
    return this.http.get<Mapa[]>(this.env.api.airQuality).pipe(share());

  };
  /**
   * 
   */
  getId(id): Observable<MapaId[]> {
    return this.http.get<MapaId[]>(`${this.env.api.airQuality}/${id}`).pipe(share());

  }

}