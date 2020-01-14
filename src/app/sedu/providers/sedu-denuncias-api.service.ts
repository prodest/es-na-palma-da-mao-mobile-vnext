import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { EnvVariables, Environment, AuthQuery } from '@espm/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Denuncia, Escola, Municipio, TipoDenuncia, PapelAutorDenuncia, TurnoRota, Rota } from '../model';

/*
  Generated class for the SeduDenunciasApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SeduDenunciasApiService {

  options = {
    "headers": {
      "token": this.env.api.seduDenunciasToken
    }
  };

  constructor(
    public http: HttpClient,
    @Inject(EnvVariables) private env: Environment,
    public auth: AuthQuery) {}

  /**
   * Obtém todos os Municípios disponíveis.
   */
  getMunicipios(): Observable<Municipio[]> {
    return this.http.get<Array<Municipio>>(`${this.env.api.seduDenuncias}/municipios`, this.options)
    .pipe(map(res => res.map(city => ({
      id: city['pk'],
      nome: city['fields']['nome'],
      sre: city['fields']['sre'],
      codigoIbge: city['fields']['cod_ibge']
    } as Municipio))));
  }

  /**
   * Obtém todas as Escolas disponíveis.
   */
  getSchools(): Observable<Escola[]> {
    return this.http.get<Escola[]>(`${this.env.api.seduDenuncias}/escolas`, this.options)
    .pipe(map(res => res.map(school => ({
      id: school['pk'],
      nome: school['fields']['nome'],
      inep: school['fields']['cod_inep'],
      municipio: school['fields']['municipio']
    } as Escola))));
  }

  /**
   * Obtém todos os Tipos de Reclamação disponíveis.
   */
  getDemandTypes(): Observable<TipoDenuncia[]> {
    return this.http.get<TipoDenuncia[]>(`${this.env.api.seduDenuncias}/tipos`, this.options)
    .pipe(map(res => res.map(type => ({
      id: type['pk'],
      nome: type['fields']['nome'],
      setor: type['fields']['setor']
    } as TipoDenuncia))));
  }

  /**
   * Obtém as reclamações feitas por um Autor.
   * @param idUser ID do usuário no Acesso Cidadão.
   */
  getUserDemands(idUser: string): Observable<Denuncia[]> {
    return this.http.get<Denuncia[]>(`${this.env.api.seduDenuncias}/reclamante/1/reclamacoes`, this.options)
    .pipe(map(res => res.map(demand => ({
      ...demand['fields'],
      id: demand['pk'],
      descricao: demand['fields']['texto'],
      outroPapel: demand['fields']['outro_papel'],
      dataReclamacao: new Date(demand['fields']['data_ocorrido']),
      rotaId: demand['fields']['rota'],
      status: "Analisando",
      tipoReclamacao: demand['fields']['tipo']
    }) as Denuncia)));
  }

  /**
   * Obtém o parecer de uma reclamação.
   */
  getDemandResponse(idDemand: number): Observable<any> {
    return this.http.get(`${this.env.api.seduDenuncias}/reclamacao/${idDemand}/parecer`, this.options);
  }

  /**
   * Obtém todos os Papéis de Autor disponíveis.
   */
  getRoles(): Observable<PapelAutorDenuncia[]> {
    return this.http.get<PapelAutorDenuncia[]>(`${this.env.api.seduDenuncias}/reclamante/papeis`, this.options)
    .pipe(map(res => res.map(role => ({
      id: role['pk'],
      nome: role['fields']['nome']
    } as PapelAutorDenuncia))));
  }

  /**
   * Envia uma reclamação ao sistema.
   * @param demand 
   */
  sendDemand(demand: Denuncia) {
    let payload = {
      ...demand,
      dataReclamacao: demand.dataReclamacao.toISOString()
    };

    return this.http.post(`${this.env.api.seduDenuncias}/reclamacao`, payload, this.options);
  }

  /**
   * Obtém todas as Rotas disponíveis.
   */
  getAllRoutes(): Observable<any> {
    return this.http.get(`${this.env.api.seduDenuncias}/rotas`, this.options);
  }

  /**
   * Obtém os Turnos de rota que existem.
   */
  getRouteShifts(): Observable<TurnoRota[]> {
    return this.http.get<TurnoRota[]>(`${this.env.api.seduDenuncias}/rotas/turnos`, this.options)
    .pipe(map(res => res.map(shift => ({
      id: shift['pk'],
      nome: shift['fields']['nome']
    } as TurnoRota))));
  }

  /**
   * Obtém as Rotas de uma Escola.
   * @param id ID da escola no Banco de Dados
   */
  getSchoolRoutes(id: number): Observable<Rota[]> {
    return this.http.get<Rota[]>(`${this.env.api.seduDenuncias}/escola/${id}/rotas`, this.options)
    .pipe(map(res => res.map(route => ({
      id: route['pk'],
      codigoRota: route['fields']['cod_linha'],
      escola: route['fields']['escola'],
      nome: route['fields']['nome'],
      turno: route['fields']['turno']
    } as Rota))));
  }

}
