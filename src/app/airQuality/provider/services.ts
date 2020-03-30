import { Injectable } from "@angular/core";
import { Mapa } from "../model/mapa.model";
import { Observable } from "rxjs/Observable";
import { AirApiService } from './airApiService'



@Injectable()
export class AirService {
  constructor(private api: AirApiService) { }
  /**
   * 
   */
  getAllQualityAir = (): Observable<Mapa[]> => {
    return this.api.getAllItems();

  };

  /**
   * 
   */


}