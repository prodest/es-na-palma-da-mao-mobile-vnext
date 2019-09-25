import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'limit' })
export class LimitPipe implements PipeTransform {
    transform(value: string, limitNum: number, limitStr: number): any {
        if (value.length > limitNum) {
            return value.substring(0, limitStr) + "…";
        } else {
            return value;
        }
    }
}