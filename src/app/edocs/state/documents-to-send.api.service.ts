import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
// import { ID } from '@datorama/akita';
import { Environment, EnvVariables } from '@espm/core';
import { Observable } from 'rxjs/Observable';
import { share } from 'rxjs/operators';

import { ApiBaseService } from './api-base.service';
import { Document } from './documents.model';
import { Destination } from './documents-to-send.model';

/**
 *
 *
 */
@Injectable()
export class DocumentsToSendApiService extends ApiBaseService<Document> {
  /**
   *
   *
   */
  constructor(private http: HttpClient, @Inject(EnvVariables) env: Environment) {
    super(`${env.api.edocs}`);
  }

  /**
   *
   */
  getDestinations(): Observable<Destination[]> {
    return this.http.get<Destination[]>(this.endpoint(`Destinos`), {}).pipe(share());
  }

  

  /**
   *
   */
  /*getForwards(): Observable<Forwards[]> {
    const tolkien = this.auth.getAccessToken().subscribe(
      token => {
        return token;
      }
    );
    const id = this.auth.refreshUser().subscribe(
      (user: AcessoCidadaoClaims) => {
        return user.subNovo;
      }
    )
    let header = new HttpHeaders();
    header.append('Authorization', 'Bearer ' + tolkien);

    return this.http.get<Forwards[]>(this.endpoint(`Encaminhamentos/${id}`), {headers: header}).pipe(share());
  }*/
}
