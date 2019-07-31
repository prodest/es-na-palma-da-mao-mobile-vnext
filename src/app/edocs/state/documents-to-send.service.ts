import { Injectable } from '@angular/core';
import { DocumentsToSendApiService } from './documents-to-send.api.service';
import { Destination, ForwardPostBody, ForwardsRecieve } from './documents-to-send.model';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class DocumentsToSendService {
    
    
  constructor(private api: DocumentsToSendApiService) {}

  getDestinations(): Observable<Destination[]> {    
    return this.api.getDestinations();
  }

  createForwards(body: ForwardPostBody): Observable<ForwardsRecieve> {
    return this.api.createForwards(body);
  }
}
