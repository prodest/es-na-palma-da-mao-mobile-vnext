import { Injectable } from '@angular/core';
import { PaystubApiService } from './paystub.api.service';

@Injectable()
export class PaystubService {
  constructor(private api: PaystubApiService) {}

  getProfiles(cpf: string) {
    return this.api.getProfiles(cpf);
  }

  getLink(perfil: string) {
    return this.api.getLink(perfil);
  }

  getLeaf(link: string) {
    return this.api.getLeaf(link);
  }

  getPaystub(leaf: string) {
    return this.api.getPaystub(leaf);
  }
}
