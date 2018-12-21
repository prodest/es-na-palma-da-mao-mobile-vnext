import { DocumentsApiService } from './documents.api.service';
import { DocumentsQuery } from './documents.query';
import { DocumentsService } from './documents.service';
import { DocumentsStore } from './documents.store';

export * from './documents.model';

export { DocumentsService, DocumentsApiService, DocumentsStore, DocumentsQuery };

export const EDocsProviders = [DocumentsService, DocumentsApiService, DocumentsStore, DocumentsQuery];
