import { DtApiService } from './dt.api.service';
import { FavoritosDtService, SelecaoQuery, SelecaoStore } from '../state';

export { DtApiService };

export const OportunidadesProviders = [DtApiService, FavoritosDtService, SelecaoQuery, SelecaoStore];
