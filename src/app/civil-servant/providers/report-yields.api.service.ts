import { EnvVariables, Environment } from '@espm/core';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPaystubYear, IReportYieldCompany } from '../interfaces';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReportYieldsApiService {
  private readonly api: string;
  constructor(private http: HttpClient, @Inject(EnvVariables) env: Environment) {
    this.api = env.api.paystub;
  }

  getYears(cpf: number, numFunc: number, numVinc: number, numPens: number): Observable<IPaystubYear[]> {
    return this.http.get<IPaystubYear[]>(
      this.endpoint(
        `informe/${cpf.toString()}/funcionarios/${numFunc.toString()}/vinculos/${numVinc.toString()}/pensionistas/${numPens.toString()}/anos`
      )
    );
  }

  getCompanies(cpf: number, numFunc: number, numVinc: number, numPens: number, ano: number): Observable<IReportYieldCompany[]> {
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
      ),
      {
        responseType: 'arraybuffer'
      }
    );
  }

  private endpoint(route: number | string): string {
    const api: string = this.api.charAt(this.api.length - 1) === '/' ? this.api.substr(this.api.length - 1) : this.api;
    return !route ? api : `${api}/${route}`.trim();
  }
}
