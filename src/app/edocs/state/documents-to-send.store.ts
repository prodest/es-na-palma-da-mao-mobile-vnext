import { StoreConfig, Store } from '@datorama/akita';
import { Injectable } from '@angular/core';
import {
  // IDocumentsToSendWizardValue,
  IBaseStepOutput,
  IAddresseesStepOutput,
  IDocStepOutput,
  IMessageOutput
} from '../interfaces';
import { WizardStep } from '../providers';

export interface DocumentsToSendState {
  basicStepState: IBaseStepOutput | null,
  addresseesStepState: IAddresseesStepOutput | null,
  docStepState: IDocStepOutput | null,
  messageStepState: IMessageOutput | null,
  activeStepState: WizardStep<any> | null;
}

const initialState: DocumentsToSendState = {
  basicStepState: null,
  addresseesStepState: null,
  docStepState: null,
  messageStepState: null,
  activeStepState: null,
};

@StoreConfig({ name: 'edocs-documents-to-send' })
@Injectable()
export class DocumentsToSendStore extends Store<DocumentsToSendState> {
  constructor() {
    super(initialState);
  }

  basicStepUpdate(basic: IBaseStepOutput){
    this.update({ basicStepState: basic });
  }

  addresseesStepUpdate(addressees: IAddresseesStepOutput){
    this.update({ addresseesStepState: addressees });
  }

  docStepUpdate(doc: IDocStepOutput){
    this.update({ docStepState: doc });
  }

  messageStepUpdate(message: IMessageOutput){
    this.update({ messageStepState: message });
  }

  activeStepUpdate(active: WizardStep<any>) {
    this.update({activeStepState: active});
  }
}
