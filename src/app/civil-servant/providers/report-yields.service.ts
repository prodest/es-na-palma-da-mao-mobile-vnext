import { Injectable } from '@angular/core';
import { ReportYieldsApiService } from './report-yields.api.service';

@Injectable()
export class ReportYieldsService {
  constructor(private api: ReportYieldsApiService) { }

  getYears(cpf: number, numFunc: number, numVinc: number, numPens: number) {
    return this.api.getYears(cpf, numFunc, numVinc, numPens);
  }

  getCompanies(cpf: number, numFunc: number, numVinc: number, numPens: number, ano: number) {
    return this.api.getCompanies(cpf, numFunc, numVinc, numPens, ano);
  }

  getReportYields(cpf: number, numFunc: number, numVinc: number, numPens: number, ano: number, codEmpresa: number) {
    return this.api.getReportYields(cpf, numFunc, numVinc, numPens, ano, codEmpresa);
  }
}
