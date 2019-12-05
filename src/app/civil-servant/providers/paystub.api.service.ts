import { EnvVariables, Environment } from '@espm/core';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPaystubProfile, IPaystubLink } from '../interfaces';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PaystubApiService {

  private readonly api: string;
  constructor(private http: HttpClient, @Inject(EnvVariables) env: Environment) {
    this.api = env.api.paystub;
  }

  getProfiles(cpf: string): Observable<IPaystubProfile[]> {
    return this.http.get<IPaystubProfile[]>(this.endpoint('perfis'), { params: { cpf } })
  }

  getLink(cpf: string, codPerfil: number, numFunc: number): Observable<IPaystubLink[]> {
    return this.http.get<IPaystubLink[]>(this.endpoint('vinculos'), {
      params: {
        cpf,
        codPerfil: codPerfil.toString(),
        numFunc: numFunc.toString()
      }
    })
  }

  getLeaf(link: string) { }

  getPaystub(leaf: string) { }

  private endpoint(route: number | string): string {
    const api: string = this.api.charAt(this.api.length - 1) === '/' ? this.api.substr(this.api.length - 1) : this.api;
    return !route ? api : `${api}/${route}`.trim();
  }
}
