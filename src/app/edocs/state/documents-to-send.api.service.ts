import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
// import { ID } from '@datorama/akita';
import { Environment, EnvVariables } from '@espm/core';
import { Observable } from 'rxjs/Observable';
import { share } from 'rxjs/operators';

import { ApiBaseService } from './api-base.service';
import { Document, Destination } from './documents.model';

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
}
