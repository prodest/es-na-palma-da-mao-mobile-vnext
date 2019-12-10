import { EnvVariables, Environment } from '@espm/core';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPaystubProfile, IPaystubLink, IPaystubYear, IPaystubMonth } from '../interfaces';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PaystubApiService {

  private readonly api: string;
  constructor(private http: HttpClient, @Inject(EnvVariables) env: Environment) {
    this.api = env.api.paystub;
  }

  getProfiles(cpf: string): Observable<IPaystubProfile[]> {
    return this.http.get<IPaystubProfile[]>(this.endpoint('perfis'), { params: { cpf } });
  }

  getLink(cpf: string, codPerfil: number, numFunc: number): Observable<IPaystubLink[]> {
    return this.http.get<IPaystubLink[]>(this.endpoint('vinculos'), {
      params: {
        cpf,
        codPerfil: codPerfil.toString(),
        numFunc: numFunc.toString(),
      }
    });
  }

  getYears(numFunc: number, numVinc: number, numPens?: number): Observable<IPaystubYear[]> {
    const params: { [key: string]: string } = {
      numFunc: numFunc.toString(),
      numVinc: numVinc.toString(),
    };
    if (typeof numPens === 'number') {
      params['numPens'] = numPens.toString();
    }
    return this.http.get<IPaystubYear[]>(this.endpoint('contracheque/anos'), {
      params
    });
  }

  getMonths(numFunc: number, numVinc: number, ano: number, numPens?: number): Observable<IPaystubMonth[]> {
    const params: { [key: string]: string } = {
      numFunc: numFunc.toString(),
      numVinc: numVinc.toString(),
      ano: ano.toString(),
    };
    if (typeof numPens === 'number') {
      params['numPens'] = numPens.toString();
    }
    return this.http.get<IPaystubMonth[]>(this.endpoint('contracheque/meses'), {
      params
    });
  }

  getLeaf(numFunc: number, numVinc: number, ano: number, mes: number, numPens?: number): Observable<any> {
    const params: { [key: string]: string } = {
      numFunc: numFunc.toString(),
      numVinc: numVinc.toString(),
      ano: ano.toString(),
      mes: mes.toString(),
    };
    if (typeof numPens === 'number') {
      params['numPens'] = numPens.toString();
    }
    return this.http.get<any>(this.endpoint('contracheque/folhas'), {
      params
    });
  }

  getPaystub(leaf: string) { }

  private endpoint(route: number | string): string {
    const api: string = this.api.charAt(this.api.length - 1) === '/' ? this.api.substr(this.api.length - 1) : this.api;
    return !route ? api : `${api}/${route}`.trim();
  }
}
