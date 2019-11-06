/*import { ApiBaseService, EnvVariables, Environment } from '@espm/core';*/
import { Injectable, /*Inject*/ } from '@angular/core';
/*import { HttpClient } from '@angular/common/http';*/

@Injectable()
export class PaystubApiService /*extends ApiBaseService<any>*/ {
  
  constructor(/*private http: HttpClient, @Inject(EnvVariables) env: Environment*/) {
    /*super(`https://api.es.gov.br/siarhes/`);*/
  }

  getProfiles(cpf: string) {}

  getLink(perfil: string) {}

  getLeaf(link: string) {}

  getPaystub(leaf: string) {}
}
