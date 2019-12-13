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

  constructor(
    public http: HttpClient,
    @Inject(EnvVariables) private env: Environment,
    public auth: AuthQuery) {}

  getMunicipios(): Observable<any> {
    return this.http.get(`${this.env.api.seduDenuncias}/municipios/`);
  }

  getSchools(): Observable<Escola[]> {
    return this.http.get<Escola[]>(`${this.env.api.seduDenuncias}/escolas/`);
  }

  getDemandTypes(): Observable<any> {
    return this.http.get(`${this.env.api.seduDenuncias}/denuncias/tipos/`);
  }

  getUserDemands(idUser: string): Observable<any> {
    return this.http.get(`${this.env.api.seduDenuncias}/reclamante/${idUser}/denuncias`);
  }

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
    

    return this.http.post(`${this.env.api.seduDenuncias}/denuncia/`, payload);
  }

  getAllRoutes(): Observable<any> {
    return this.http.get(`${this.env.api.seduDenuncias}/rotas/`);
  }

  getSchoolRoutes(id): Observable<any> {
    return this.http.get(`${this.env.api.seduDenuncias}/escola/${id}/rotas`);
  }

}
