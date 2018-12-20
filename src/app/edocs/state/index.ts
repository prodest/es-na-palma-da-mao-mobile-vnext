import { environment } from '@espm/core';

import { DocumentsMockApiService } from './documents-mock.api.service';
import { DocumentsApiService } from './documents.api.service';
import { DocumentsQuery } from './documents.query';
import { DocumentsService } from './documents.service';
import { DocumentsStore } from './documents.store';

export * from './documents.model';

export { DocumentsService, DocumentsApiService, DocumentsStore, DocumentsQuery };

const DocumentApiProvider = environment.mocks.edocs
  ? {
      provide: DocumentsApiService,
      useClass: DocumentsMockApiService
    }
  : DocumentsApiService;

export const EDocsProviders = [DocumentsService, DocumentApiProvider, DocumentsStore, DocumentsQuery];
