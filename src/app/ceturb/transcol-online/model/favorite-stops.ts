export interface FavoriteStopsData {
  id?: number;
  items: FavoriteStop[];
  date?: string;
}

export interface FavoriteStop {
  id: number;
  location: FavoriteLocation;
}

export type FavoriteLocation = 'casa' | 'trabalho' | 'escola' | 'outros';
