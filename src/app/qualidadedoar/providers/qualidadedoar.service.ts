import { Injectable } from "@angular/core";
import { Mapa } from "../model/mapa.model";
import { Observable } from "rxjs/Observable";
import { QualidadedoArApi } from "./api-qualidadedoar.service";



@Injectable()
export class QualidadedoArService {
  constructor(private api: QualidadedoArApi) { }
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