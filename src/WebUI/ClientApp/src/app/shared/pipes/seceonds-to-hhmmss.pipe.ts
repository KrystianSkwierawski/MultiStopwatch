import { Pipe, PipeTransform } from '@angular/core';
import { defaultTime, totalSecondsToHHMMSS } from '../services/timer/timer.model';

@Pipe({
  name: 'seceondsToHhmmss'
})
export class SecondsToHhmmssPipe implements PipeTransform {

  transform(value: unknown): unknown {
    if (value > 0) {
      return totalSecondsToHHMMSS(value);
    }

    return defaultTime;
  }
}
