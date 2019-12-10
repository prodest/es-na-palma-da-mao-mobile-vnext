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

  getMonths(numFunc: number, numVinc: number, ano: number, numPens?: number) {
    return this.api.getMonths(numFunc, numVinc, ano, numPens);
  }

  getLeaf(numFunc: number, numVinc: number, ano: number, mes: number, numPens?: number) {
    return this.api.getLeaf(numFunc, numVinc, ano, mes, numPens);
  }

  getPaystub(leaf: string) {
    return this.api.getPaystub(leaf);
  }
}
