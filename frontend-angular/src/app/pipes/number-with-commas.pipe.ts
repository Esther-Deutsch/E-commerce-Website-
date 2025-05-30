import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberWithCommas'
})
export class NumberWithCommasPipe implements PipeTransform {

  transform(value: number | string): string {
    if (value === null || value === undefined) return '';
    return Number(value).toLocaleString('en-US');
  }
}
