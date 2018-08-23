import { FavoriteProtocol } from './favorite-protocol';

export interface FavoriteProtocolsData {
  id?: number;
  protocols: FavoriteProtocol[];
  date?: string;
}
