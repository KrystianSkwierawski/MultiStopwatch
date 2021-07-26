import { Pipe, PipeTransform } from '@angular/core';
import { totalSecondsToHHMMSS } from '../services/timer/Timer';

@Pipe({
  name: 'seceondsToHhmmss'
})
export class SeceondsToHhmmssPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value > 0) {
      return totalSecondsToHHMMSS(value);
    }

    return value;
  }
}
