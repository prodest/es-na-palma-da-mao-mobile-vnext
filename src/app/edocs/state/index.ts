import { DocumentsApiService } from './documents.api.service';
import { DocumentsQuery } from './documents.query';
import { DocumentsService } from './documents.service';
import { DocumentsStore } from './documents.store';
import { DocumentsToSendApiService } from './documents-to-send.api.service';
import { DocumentsToSendService } from './documents-to-send.service';
import { DocumentsToSendQuery } from './documents-to-send.query';
import { DocumentsToSendStore } from './documents-to-send.store';

export * from './documents.model';
export * from './documents-to-send.model';

export { DocumentsService, DocumentsApiService, DocumentsStore, DocumentsQuery, DocumentsToSendApiService, DocumentsToSendService, DocumentsToSendQuery, DocumentsToSendStore };

export const EDocsProviders = [DocumentsService, DocumentsApiService, DocumentsStore, DocumentsQuery, DocumentsToSendApiService, DocumentsToSendService, DocumentsToSendQuery, DocumentsToSendStore ];
