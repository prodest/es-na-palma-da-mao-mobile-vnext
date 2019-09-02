import { Query } from '@datorama/akita';
import { DocumentsToSendStore, DocumentsToSendState } from './documents-to-send.store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DocumentsToSendQuery extends Query<DocumentsToSendState> {

  constructor(protected store: DocumentsToSendStore) {
    super(store);
  }

  getWizardState(): Observable<DocumentsToSendState> {
    return this.select(state => state);
  }

}