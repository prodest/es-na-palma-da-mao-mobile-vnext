import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { EnvVariables, Environment, AuthQuery } from '@espm/core';
import { Observable } from 'rxjs/Observable';
import { Denuncia } from '../model/denuncia';
import { Escola } from '../model/escola';

/*
  Generated class for the SeduDenunciasApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SeduDenunciasApiService {

  options = {
    headers: {
      token: "fda958073b28452290110eae204a7fa"
    }
  };

  constructor(
    public http: HttpClient,
    @Inject(EnvVariables) private env: Environment,
    public auth: AuthQuery) {}

  /**
   * Obtém todos os Municípios disponíveis.
   */
  getMunicipios(): Observable<any> {
    return this.http.get(`${this.env.api.seduDenuncias}/municipios`, this.options);
  }

  /**
   * Obtém todas as Escolas disponíveis.
   */
  getSchools(): Observable<Escola[]> {
    return this.http.get<Escola[]>(`${this.env.api.seduDenuncias}/escolas`, this.options);
  }

  /**
   * Obtém todos os Tipos de Reclamação disponíveis.
   */
  getDemandTypes(): Observable<any> {
    return this.http.get(`${this.env.api.seduDenuncias}/tipos`, this.options);
  }

  /**
   * Obtém as reclamações feitas por um Autor.
   * @param idUser ID do usuário no Acesso Cidadão.
   */
  getUserDemands(idUser: string): Observable<any> {
    return this.http.get(`${this.env.api.seduDenuncias}/reclamante/${idUser}/denuncias`, this.options);
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
  getRoles(): Observable<any> {
    return this.http.get(`${this.env.api.seduDenuncias}/reclamante/papeis`, this.options);
  }

  /**
   * Envia uma reclamação ao sistema.
   * @param demand 
   */
  sendDemand(demand: Denuncia) {
    let payload = {
      autor: demand.autor,
      papel_do_autor: demand.papelDoAutor,
      outro_papel: demand.outroPapel,
      email: demand.email,
      acesso_cidadao: this.auth.state.claims.subNovo,

      aluno: demand.aluno,
      registro_academico: demand.registroAcademico,
      codigo_edp: demand.codigoEDP,
      inep_escola: demand.inepEscola,

      setor_reclamacao: 0,
      placa_veiculo: demand.placaVeiculo,
      codigo_rota: demand.codigoRota,
      tipo_reclamacao: demand.tipoReclamacao,
      outro_tipo: demand.outroTipo,
      data_ocorrido: demand.dataReclamacaoString,
      descricao: demand.descricao
    };

    console.log(payload);
    

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
  getRouteShifts(): Observable<any> {
    return this.http.get(`${this.env.api.seduDenuncias}/rotas/turnos`, this.options);
  }

  /**
   * Obtém as Rotas de uma Escola.
   * @param id ID da escola no Banco de Dados
   */
  getSchoolRoutes(id: number): Observable<any> {
    return this.http.get(`${this.env.api.seduDenuncias}/escola/${id}/rotas`, this.options);
  }

}
