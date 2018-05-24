import { FavoriteLocation } from './favorite-stops';

export interface BusStop {
  id: number;
  identificador: string;
  descricao: string;
  direcao: number;
  latitude: number;
  longitude: number;
  logradouro: string;
  municipio: string;
  bairro: string;
  isTerminal: boolean;
  isPonto: boolean;
  isFavorite: boolean;
  favoriteLocation?: FavoriteLocation;
  tipo: 'ponto' | 'terminal';
}
