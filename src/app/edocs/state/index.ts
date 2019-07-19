import { DocumentsApiService } from './documents.api.service';
import { DocumentsQuery } from './documents.query';
import { DocumentsService } from './documents.service';
import { DocumentsStore } from './documents.store';
import { DocumentsToSendApiService } from './documents-to-send.api.service';
import { DocumentsToSendService } from './documents-to-send.service';

export * from './documents.model';

export { DocumentsService, DocumentsApiService, DocumentsStore, DocumentsQuery, DocumentsToSendApiService, DocumentsToSendService };

export const EDocsProviders = [DocumentsService, DocumentsApiService, DocumentsStore, DocumentsQuery, DocumentsToSendApiService, DocumentsToSendService];
