import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { flatMap, tap } from 'rxjs/operators';

import { SepStorageService } from './sep-storage.service';
import { SepApiService } from './sep-api.service';
import { FavoriteProcessData } from './../model';

@Injectable()
export class SepService {
  private favoriteProcess = [];

  constructor(private api: SepApiService, private storage: SepStorageService) {}

  get getFavoriteProcess(): string[] {
    return this.favoriteProcess;
  }

  isFavoriteProcess(processNumber: string): boolean {
    return !!this.storage.getValue('favoriteProcess').find(p => p === processNumber);
  }

  addToFavoriteProcess(processNumber: string) {
    this.favoriteProcess.splice(this.locationOf(processNumber, this.favoriteProcess), 0, processNumber);
  }

  removeFromFavoriteProcess(processNumber: string) {
    this.favoriteProcess = this.favoriteProcess.filter(p => p !== processNumber);
    this.syncFavoriteProcess(this.favoriteProcess);
  }

  syncFavoriteProcess = (favoriteProcess?: string[]): Observable<string[]> => {
    const syncData: FavoriteProcessData = { favoriteProcess: [], date: null };

    if (favoriteProcess) {
      syncData.favoriteProcess = favoriteProcess;
      syncData.date = new Date().toISOString();
    }

    return this.api
      .syncFavoriteProcess(syncData)
      .pipe(tap((favoriteProcessData: FavoriteProcessData) => (this.favoriteProcess = favoriteProcessData.favoriteProcess)))
      .pipe(
        flatMap((favoriteProcessData: FavoriteProcessData) =>
          this.storage.mergeValue('favoriteProcess', favoriteProcessData.favoriteProcess)
        )
      );
  };

  private locationOf(element: any, array: any[], start?: number, end?: number) {
    start = start || 0;
    end = end === undefined ? array.length - 1 : end;
    let pivot = Math.floor((start + end) / 2);
    if (end < start || array[pivot] === element) {
      return pivot + 1;
    }
    if (array[pivot] < element) {
      return this.locationOf(element, array, pivot + 1, end);
    } else {
      return this.locationOf(element, array, start, pivot - 1);
    }
  }
}
