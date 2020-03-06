import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { EnvVariables, Environment, AuthQuery } from '@espm/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Denuncia, Escola, Municipio, TipoDenuncia, PapelAutorDenuncia, TurnoRota, Rota, StatusDenuncia } from '../model';

/*
  Generated class for the SeduDenunciasApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SeduDenunciasApiService {

  options = {};

  constructor(
    public http: HttpClient,
    @Inject(EnvVariables) private env: Environment,
    public auth: AuthQuery) {
      
      this.options = {
        "headers": {
          // "token": this.env.api.seduDenunciasToken
        }
      };
    }

  /**
   * Obtém todos os Municípios disponíveis.
   */
  getMunicipios(): Observable<Municipio[]> {
    return this.http.get<Array<Municipio>>(`${this.env.api.seduDenuncias}/municipios`, this.options)
    .pipe(map(res => res.map(city => ({
      ...city,
      sre: city['sreId'],
      codigoIbge: city['codIbge']
    } as Municipio))));
  }

  /**
   * Obtém todas as Escolas disponíveis.
   */
  getSchools(): Observable<Escola[]> {
    return this.http.get<Escola[]>(`${this.env.api.seduDenuncias}/escolas`, this.options)
    .pipe(map(res => res.map(school => ({
      ...school,
      inep: school['codInep'],
      municipio: school['municipioId']
    } as Escola))));
  }

  /**
   * Obtém todos os Tipos de Reclamação disponíveis.
   */
  getDemandTypes(): Observable<TipoDenuncia[]> {
    return this.http.get<TipoDenuncia[]>(`${this.env.api.seduDenuncias}/tipos`, this.options)
    .pipe(map(res => res.map(type => ({
      ...type,
      setor: type['setorId']
    } as TipoDenuncia))));
  }

  /**
   * Obtém todos os Status de Reclamação possíveis
   */
  getDemandStatus(): Observable<StatusDenuncia[]> {
    return this.http.get<StatusDenuncia[]>(`${this.env.api.seduDenuncias}/reclamacao/status`, this.options)
    .pipe();
  }

  /**
   * Obtém as reclamações feitas por um Autor.
   * @param idUser ID do usuário no Acesso Cidadão.
   */
  getUserDemands(cpf: string): Observable<Denuncia[]> {    
    return this.http.get<Denuncia[]>(`${this.env.api.seduDenuncias}/reclamante/${cpf}/reclamacoes`, this.options)
    .pipe(map(res => res.map((demand: any) => ({
      ...demand,
      // *dataRegistro: new Date(demand['created_on']),
      // status: demand['status'],
      // protocolo: demand['protocolo'],

      descricao: demand['texto'],
      tipoReclamacao: demand['tipo'],
      // outroTipo: demand['outro_tipo'],
      dataReclamacao: new Date(demand['dataOcorrido']),
      // rota: demand['rota'],
      // placaVeiculo: demand['placa_veiculo'],
      
      autor: demand['reclamante'],
      papelDoAutor: demand['papel'],
      // outroPapel: demand['outro_papel'],

      // aluno: demand['aluno']['nome'],
      // *codigoEDP: demand['aluno']['cod_energia'],
      // *registroAcademico: demand['aluno']['ra'],
      // *escola: demand['aluno']['escola'],
      parecer: demand['parecerFinal']


    }) as Denuncia)));
  }

  /**
   * Obtém o parecer de uma reclamação.
   */
  getDemandResponse(idDemand: number): Observable<any> {
    return this.http.get(`${this.env.api.seduDenuncias}/reclamacao/${idDemand}/parecer`, this.options)
    .pipe(map((res: [any]) => 
      res.length > 0 ? res[0]["fields"]["texto"] : ""
    ));
  }

  /**
   * Obtém todos os Papéis de Autor disponíveis.
   */
  getRoles(): Observable<PapelAutorDenuncia[]> {
    return this.http.get<PapelAutorDenuncia[]>(`${this.env.api.seduDenuncias}/reclamante/papeis`, this.options)
    .pipe();
  }

  /**
   * Envia uma reclamação ao sistema.
   * @param demand 
   */
  sendDemand(demand: Denuncia) {
    return this.http.post(`${this.env.api.seduDenuncias}/reclamacao`, demand, this.options);
  }

  /**
   * Obtém os Turnos de rota que existem.
   */
  getRouteShifts(): Observable<TurnoRota[]> {
    return this.http.get<TurnoRota[]>(`${this.env.api.seduDenuncias}/rotas/turnos`, this.options)
    .pipe();
  }

  /**
   * Obtém as Rotas de uma Escola.
   * @param id ID da escola no Banco de Dados
   */
  getSchoolRoutes(id: number): Observable<Rota[]> {
    return this.http.get<Rota[]>(`${this.env.api.seduDenuncias}/escolas/${id}/rotas`, this.options)
    .pipe(map(res => res.map(route => ({
      ...route,
      codigoRota: route['codLinha'],
      tipo: route['tipo']
    } as Rota))));
  }

}
