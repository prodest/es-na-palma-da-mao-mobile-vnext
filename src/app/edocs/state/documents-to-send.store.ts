import { StoreConfig, Store } from '@datorama/akita';
import { Injectable } from '@angular/core';
import {
  // IDocumentsToSendWizardValue,
  IBaseStepOutput,
  IAddresseesStepOutput,
  IDocStepOutput,
  IMessageOutput
} from '../interfaces';

// const basicStepDefault: IBaseStepOutput = {
//   titleForward: null,
//   sender: null,
//   role: null,
//   notification: true
// };

// const addresseesStepDefault: IAddresseesStepOutput = [
//   {
//     id: null,
//     descricao: null,
//     tipo: null
//   }
// ];

// const docStepDefault: IDocStepOutput = {
//   name: null,
//   documentType: 0,
//   documentPaperType: 0,
//   documentAssignType: 0,
//   file: null
// };

// const messageStepDefault: IMessageOutput = {
//   message: null
// };

// const wizardValueDefault = {
//   basicStep: basicStepDefault,
//   addresseesStep: addresseesStepDefault,
//   docStep: docStepDefault,
//   messageStep: messageStepDefault
// };

export interface DocumentsToSendState {
  basicStepState: IBaseStepOutput | null,
  addresseesStepState: IAddresseesStepOutput | null,
  docStepState: IDocStepOutput | null,
  messageStepState: IMessageOutput | null,

  // wizardValueState: IDocumentsToSendWizardValue
}

const initialState: DocumentsToSendState = {
  basicStepState: null,
  addresseesStepState: null,
  docStepState: null,
  messageStepState: null
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

  // wizardUpdate(wizard: IDocumentsToSendWizardValue) {
  //   this.update({ wizardValue: wizard });
  // }
}
