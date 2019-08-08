import { Injectable } from '@angular/core';
import { DocumentsToSendApiService } from './documents-to-send.api.service';
import { Destination, ForwardPostBody, ForwardsRecieve, CapturePostBody, CaptureReceive, WizardSteps } from './documents-to-send.model';
import { Observable } from 'rxjs/Observable';
import { DocumentsToSendStore } from './documents-to-send.store';

@Injectable()
export class DocumentsToSendService {

  constructor(private api: DocumentsToSendApiService, private store: DocumentsToSendStore) { }

  getDestinations(): Observable<Destination[]> {
    return this.api.getDestinations();
  }

  captureDocuments(body: CapturePostBody): Observable<CaptureReceive> {
    return this.api.captureDocuments(body);
  }

  createForwards(body: ForwardPostBody): Observable<ForwardsRecieve> {
    return this.api.createForwards(body);
  }

  storeUpdate(step: any, stepName: string) {
    switch (stepName) {
      case WizardSteps.BASIC:
        this.store.basicStepUpdate(step);
        break;
      case WizardSteps.ADDRESSEES:
        this.store.addresseesStepUpdate(step);
        break;
      case WizardSteps.DOC:
        this.store.docStepUpdate(step);
        break;
      case WizardSteps.MESSAGE:
        this.store.messageStepUpdate(step);
        break;
      case WizardSteps.ACTIVE:
        this.store.activeStepUpdate(step);
        break;
      default:
        break;
    }
  }
}
