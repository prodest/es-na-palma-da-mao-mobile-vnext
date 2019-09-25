import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ListItem } from '../models/list-item.model';
import { TipoAgenda } from '../models/schedule-type.model';
import { Environment, EnvVariables } from '@espm/core';

@Injectable()
export class SchedulingService {
  // TODO: remover assim que a api de agendamento permitir header Authorization em CORS request
  private headers = new HttpHeaders({ anonymous: 'true' });

  constructor(public http: HttpClient, @Inject(EnvVariables) private env: Environment) {}

  getCategories(): Observable<ListItem[]> {
    return this.http.get<ListItem[]>(`${this.env.api.scheduling}/categorias`, { headers: this.headers });
  }

  getServices(categoryId: number): Observable<ListItem[]> {
    return this.http.get<ListItem[]>(`${this.env.api.scheduling}/categorias/${categoryId}/servicos`, {
      headers: this.headers
    });
  }

  getUnits(serviceId: number): Observable<ListItem[]> {
    return this.http.get<ListItem[]>(`${this.env.api.scheduling}/servicos/${serviceId}/unidades`, { headers: this.headers });
  }

  getScheduleDetails(serviceId: number, unitId: number): Observable<TipoAgenda> {
    return this.http.get<TipoAgenda>(`${this.env.api.scheduling}/servicos/${serviceId}/unidades/${unitId}`, {
      headers: this.headers
    });
  }

  getServiceDetails(portalServiceId: number): Observable<any> {
    return this.http.get(`${this.env.api.guide}/DetalhesSemFormatar/${portalServiceId}`, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        anonymous: 'true'
      },
      responseType: 'text'
    });
  }

  getAvailableScheduleTimes(serviceId: number, unitId: number, date: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.env.api.scheduling}/servicos/${serviceId}/unidades/${unitId}/horarios/${date}`, {
      headers: this.headers
    });
  }

  save(info) {
    return this.http.post(`${this.env.api.scheduling}/agendamentos`, info, { headers: this.headers });
  }

  sendEmail(email: string, info: any) {
    return this.http.post(
      this.env.api.mailer,
      {
        from: 'agendamento@prodest.es.gov.br',
        to: email,
        subject: 'Dados do seu agendamento',
        html: info
      },
      { headers: this.headers }
    );
  }

  getDocumentTypes(): Observable<ListItem[]> {
    return this.http.get<ListItem[]>(`${this.env.api.scheduling}/tiposdocumentos`, { headers: this.headers });
  }

  findScheduling(info: any): any {
    return this.http.get(`${this.env.api.scheduling}/agendamentos`, {
      headers: this.headers,
      params: {
        documento: info.documento,
        codigo: info.codigo,
        tipoDocumento: info.tipoDocumento
      }
    });
  }

  cancelScheduling(id: string) {
    return this.http.delete(`${this.env.api.scheduling}/agendamentos/${id}`, { headers: this.headers });
  }
}
