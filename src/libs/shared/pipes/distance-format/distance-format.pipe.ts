import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'distanceFormat' })
export class DistanceFormatPipe implements PipeTransform {

  constructor() {}

  transform(distance: number) {
    if (!distance) return '';
    return distance > 1000 ? (distance/1000).toFixed(2)+' Km' : distance.toFixed(0)+' m';
  }
}
