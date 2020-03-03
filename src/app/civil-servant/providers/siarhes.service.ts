import { Injectable } from '@angular/core';
import { SiarhesApiService } from './siarhes.api.service';

@Injectable()
export class SiarhesService {
  constructor(private api: SiarhesApiService) { }

  getProfiles(cpf: string) {
    return this.api.getProfiles(cpf);
  }

  getLink(cpf: string, codPerfil: number, numFunc: number) {
    return this.api.getLink(cpf, codPerfil, numFunc);
  }

  /**
   * Contracheque
   * 
   */
  getPaystubYears(numFunc: number, numVinc: number, numPens?: number) {
    return this.api.getPaystubYears(numFunc, numVinc, numPens);
  }

  getPaystubMonths(numFunc: number, numVinc: number, ano: number, numPens: number) {
    return this.api.getPaystubMonths(numFunc, numVinc, ano, numPens);
  }

  getPaystubPayroll(numFunc: number, numVinc: number, ano: number, mes: number, numPens: number) {
    return this.api.getPaystubPayroll(numFunc, numVinc, ano, mes, numPens);
  }

  getPaystub(numFunc: number, numVinc: number, ano: number, mes: number, folha: number, empCodigo: number, codPerfil: number, numPens: number) {
    return this.api.getPaystub(numFunc, numVinc, ano, mes, folha, empCodigo, codPerfil, numPens);
  }

  /**
   * Informe Rendimentos
   *  
   */
  getReportYieldsYears(cpf: number, numFunc: number, numVinc: number, numPens: number) {
    return this.api.getReportYieldsYears(cpf, numFunc, numVinc, numPens);
  }

  getReportYieldsCompanies(cpf: number, numFunc: number, numVinc: number, numPens: number, ano: number) {
    return this.api.getReportYieldsCompanies(cpf, numFunc, numVinc, numPens, ano);
  }

  getReportYields(cpf: number, numFunc: number, numVinc: number, numPens: number, ano: number, codEmpresa: number) {
    return this.api.getReportYields(cpf, numFunc, numVinc, numPens, ano, codEmpresa);
  }
}
