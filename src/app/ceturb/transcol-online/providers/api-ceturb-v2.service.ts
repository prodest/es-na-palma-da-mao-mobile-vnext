import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { share, map } from 'rxjs/operators';
import { EnvVariables, Environment } from '@espm/core';

@Injectable()
export class ApiCeturbV2Service {

  constructor(private http: HttpClient, @Inject(EnvVariables) private env: Environment) {

  }

  /**
   * Retorna todos os pontos de ônibus.
   */
  allStops() {
    return this.http.get(`${this.env.api.ceturbv2}/pontos`).pipe(share());
  }

  /**
   * Retorna as previsões de ônibus para um ponto.
   * @param stopId - ID do ponto que se quer saber as previsões.
   */
  previsionsByStop(stopId: number) {
    return this.http.get(`${this.env.api.ceturbv2}/estimativas/ponto/${stopId}/origem`)
    .pipe(
      map(previsions => previsions['estimativas'])
    );
  }

  /**
   * Retorna as previsões de ônibus para um ponto com um intervalo limite.
   * @param stopId - ID do ponto que se quer saber as previsões.
   * @param intervalInMinutes - Tempo em minutos que se quer saber as previsões.
   */
  previsionsByStopOnInterval(stopId: number, intervalInMinutes: number) {
    const limitInterval = Date.now() + (intervalInMinutes * 60000);
    return this.previsionsByStop(stopId)
    .pipe(
      map(
        (previsions: Array<{}>) => previsions
                            .filter((prevision) => prevision['horarioNaOrigem'] < limitInterval)
                            .sort((a, b) => a['horarioNaOrigem'] - b['horarioNaOrigem'])
      )
    );
  }
}
