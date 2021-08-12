import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: string): unknown {
    if (value.length > 15) {
      return value.substr(0, 12) + "...";
    }

    return value;
  }
}
