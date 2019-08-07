import { Injectable } from '@angular/core';
import { DocumentsToSendApiService } from './documents-to-send.api.service';
import { Destination, ForwardPostBody, ForwardsRecieve } from './documents-to-send.model';
import { Observable } from 'rxjs/Observable';
import { DocumentsToSendStore } from './documents-to-send.store';

@Injectable()
export class DocumentsToSendService {
  
  constructor(private api: DocumentsToSendApiService, private store: DocumentsToSendStore) {}

  getDestinations(): Observable<Destination[]> {
    return this.api.getDestinations();
  }

  createForwards(body: ForwardPostBody): Observable<ForwardsRecieve> {
    return this.api.createForwards(body);
  }

  storeUpdate(step: any, stepName: string) {
    switch (stepName) {
      case 'basicStep':
        this.store.basicStepUpdate(step);
        break;
      case 'addresseesStep':
        this.store.addresseesStepUpdate(step);
        break;
      case 'docStep':
        this.store.docStepUpdate(step);
        break;
      case 'messageStep':
        this.store.messageStepUpdate(step);
        break;
      default:
        break;
    }
  }
}
