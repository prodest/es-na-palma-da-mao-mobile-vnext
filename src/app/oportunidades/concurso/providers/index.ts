import { SelecaoApiService } from './selecao.api.service';
import { SelecaoService } from './selecao.service';
import { SelecaoQuery } from './selecao.query';
import { SelecaoStore } from './selecao.store';

export { SelecaoApiService as DtApiService, SelecaoService, SelecaoQuery, SelecaoStore };

export const OportunidadesProviders = [SelecaoApiService, SelecaoService, SelecaoQuery, SelecaoStore];
