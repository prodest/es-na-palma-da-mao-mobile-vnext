import { Injectable } from '@angular/core';
import { PaystubApiService } from './paystub.api.service';

@Injectable()
export class PaystubService {
  constructor(private api: PaystubApiService) { }

  getProfiles(cpf: string) {
    return this.api.getProfiles(cpf);
  }

  getLink(cpf: string, codPerfil: number, numFunc: number) {
    return this.api.getLink(cpf, codPerfil, numFunc);
  }

  getYears(numFunc: number, numVinc: number, numPens?: number) {
    return this.api.getYears(numFunc, numVinc, numPens);
  }

  getMonths(numFunc: number, numVinc: number, ano: number, numPens: number) {
    return this.api.getMonths(numFunc, numVinc, ano, numPens);
  }

  getPayroll(numFunc: number, numVinc: number, ano: number, mes: number, numPens: number) {
    return this.api.getPayroll(numFunc, numVinc, ano, mes, numPens);
  }

  getPaystub(numFunc: number, numVinc: number, ano: number, mes: number, folha: number, empCodigo: number, codPerfil: number, numPens: number) {
    return this.api.getPaystub(numFunc, numVinc, ano, mes, folha, empCodigo, codPerfil, numPens);
  }
}
