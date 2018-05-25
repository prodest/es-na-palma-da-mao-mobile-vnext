import { FavoriteProtocol } from '../model';

export interface SepStorageModel {
  id?: number;
  favoriteProtocols: FavoriteProtocol[];
  date: string;
}
