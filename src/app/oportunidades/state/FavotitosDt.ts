import { Injectable } from '@angular/core';

import { Concurso } from '../model';
import { Observable } from 'rxjs/observable';
import { timer } from 'rxjs/observable/timer';
import { mapTo } from 'rxjs/operators';

@Injectable()
export class FavoritosDtService {
  /**
   *
   */
  private exemplo: Concurso[] = [
    { id: 9999, status: 'andamento', orgao: 'Favorito1 ', descricao: ' Edital nº 22/2018 ' },
    { id: 5555, status: 'andamento', orgao: 'Favorito2 ', descricao: ' Edital nº08/2018 ' }
  ];
  constructor() {}

  get(): Observable<Concurso[]> {
    return timer(2000).pipe(mapTo(this.exemplo));
  }
}
