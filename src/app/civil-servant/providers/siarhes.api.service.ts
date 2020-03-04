import { EnvVariables, Environment } from '@espm/core';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISiarhesProfile, ISiarhesLink, IPaystubYear, IPaystubMonth, IPaystubPayroll, IReportYieldCompany } from '../interfaces';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SiarhesApiService {

  private readonly api: string;
  constructor(private http: HttpClient, @Inject(EnvVariables) env: Environment) {
    this.api = env.api.siarhes;
  }

  getProfiles(cpf: string): Observable<ISiarhesProfile[]> {
    return this.http.get<ISiarhesProfile[]>(this.endpoint('perfis'), { params: { cpf } });
  }

  getLink(cpf: string, codPerfil: number, numFunc: number): Observable<ISiarhesLink[]> {
    return this.http.get<ISiarhesLink[]>(this.endpoint('vinculos'), {
      params: {
        cpf,
        codPerfil: codPerfil.toString(),
        numFunc: numFunc.toString(),
      }
    });
  }

  getPaystubYears(numFunc: number, numVinc: number, numPens: number): Observable<IPaystubYear[]> {
    const params: { [key: string]: string } = {
      numFunc: numFunc.toString(),
      numVinc: numVinc.toString(),
      numPens: numPens.toString(),
    };
    return this.http.get<IPaystubYear[]>(this.endpoint('contracheque/anos'), {
      params
    });
  }

  getPaystubMonths(numFunc: number, numVinc: number, ano: number, numPens: number): Observable<IPaystubMonth[]> {
    const params: { [key: string]: string } = {
      numFunc: numFunc.toString(),
      numVinc: numVinc.toString(),
      ano: ano.toString(),
      numPens: numPens.toString(),
    };
    return this.http.get<IPaystubMonth[]>(this.endpoint('contracheque/meses'), {
      params
    });
  }

  getPaystubPayroll(numFunc: number, numVinc: number, ano: number, mes: number, numPens: number): Observable<IPaystubPayroll[]> {
    const params: { [key: string]: string } = {
      numFunc: numFunc.toString(),
      numVinc: numVinc.toString(),
      ano: ano.toString(),
      mes: mes.toString(),
      numPens: numPens.toString(),
    };
    const retorno = this.http.get<IPaystubPayroll[]>(this.endpoint('contracheque/folhas'), {
      params
    });
    return retorno;
  }

  getPaystub(numFunc: number, numVinc: number, ano: number, mes: number, folha: number, empCodigo: number, codPerfil: number, numPens: number) {
    const params: { [key: string]: string } = {
      numFunc: numFunc.toString(),
      numVinc: numVinc.toString(),
      ano: ano.toString(),
      mes: mes.toString(),
      folha: folha.toString(),
      empCodigo: empCodigo.toString(),
      codPerfil: codPerfil.toString(),
      numPens: numPens.toString(),
    }
    return this.http.get(this.endpoint('contracheque'), { params, responseType: 'arraybuffer' });
  }

  getReportYieldsYears(cpf: number, numFunc: number, numVinc: number, numPens: number): Observable<IPaystubYear[]> {
    return this.http.get<IPaystubYear[]>(
      this.endpoint(
        `informe/${cpf.toString()}/funcionarios/${numFunc.toString()}/vinculos/${numVinc.toString()}/pensionistas/${numPens.toString()}/anos`
      )
    );
  }

  getReportYieldsCompanies(cpf: number, numFunc: number, numVinc: number, numPens: number, ano: number): Observable<IReportYieldCompany[]> {
    return this.http.get<IReportYieldCompany[]>(
      this.endpoint(
        `informe/${cpf.toString()}/funcionarios/${numFunc.toString()}/vinculos/${numVinc.toString()}/pensionistas/${numPens.toString()}/anos/${ano.toString()}/empresas`
      )
    );
  }

  getReportYields(cpf: number, numFunc: number, numVinc: number, numPens: number, ano: number, codEmpresa: number) {
    return this.http.get(
      this.endpoint(
        `informe/${cpf.toString()}/funcionarios/${numFunc.toString()}/vinculos/${numVinc.toString()}/pensionistas/${numPens.toString()}/anos/${ano.toString()}/empresas/${codEmpresa}/pdf`
      ),{ responseType: 'arraybuffer' }
    );
  }

  private endpoint(route: number | string): string {
    const api: string = this.api.charAt(this.api.length - 1) === '/' ? this.api.substr(this.api.length - 1) : this.api;
    return !route ? api : `${api}/${route}`.trim();
  }
}
