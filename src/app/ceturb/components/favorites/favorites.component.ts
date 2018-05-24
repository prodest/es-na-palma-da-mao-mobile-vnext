import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { delay, throttle } from 'helpful-decorators';
import { Slides } from 'ionic-angular';
import chunk from 'lodash-es/chunk';

import { BusStop } from './../../model/bus-stop';

@Component({
  selector: 'favorites',
  templateUrl: './favorites.component.html'
})
export class FavoritesComponent implements OnChanges {
  @ViewChild(Slides) slides: Slides;
  @Input() favorites: BusStop[] = [];
  @Input() visible: boolean;
  @Input() pageSize = 3;
  @Output() favoriteClick = new EventEmitter<BusStop>();
  pages: BusStop[][];

  /**
   *
   *
   */
  ngOnChanges(changes: SimpleChanges) {
    if ('favorites' in changes || 'pageSize' in changes) {
      // quebra em grupos(páginas)
      this.pages = chunk(this.favorites.sort(this.sortByFavoriteLocation), this.pageSize);

      // volta para a 1° página do slider caso o número de favoritos seja <= tam da página
      if (this.favorites.length <= this.pageSize) {
        this.resetSlider();
      }
    }
  }

  /**
   *
   *
   */
  @delay(500) // evita erro no slide
  @throttle(500)
  private resetSlider() {
    this.slides.slideTo(1, 200, false);
  }

  /**
   *
   *
   */
  private sortByFavoriteLocation = (a: BusStop, b: BusStop) => {
    if (a.favoriteLocation === 'outros') {
      return 1;
    }
    if (b.favoriteLocation === 'outros') {
      return -1;
    }
    return a.favoriteLocation.localeCompare(b.favoriteLocation);
  };
}
