import { Injectable } from '@angular/core';
import { DocumentsToSendApiService } from './documents-to-send.api.service';
import { DestinationReceive, ForwardPostBody, ForwardsRecieve, CapturePostBody, CaptureReceive, WizardSteps } from './documents-to-send.model';
import { Observable } from 'rxjs/Observable';
import { DocumentsToSendStore } from './documents-to-send.store';

@Injectable()
export class DocumentsToSendService {

  constructor(private api: DocumentsToSendApiService, private store: DocumentsToSendStore) { }

  getDestinations(): Observable<DestinationReceive[]> {
    return this.api.getDestinations();
  }

  captureDocuments(fileName: string, body: CapturePostBody): Observable<CaptureReceive> {
    return this.api.captureDocuments(fileName, body);
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
      default:
        break;
    }
  }
}
