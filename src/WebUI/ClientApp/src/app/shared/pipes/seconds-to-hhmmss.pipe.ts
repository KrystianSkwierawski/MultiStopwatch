import { Pipe, PipeTransform } from '@angular/core';
import { defaultTime, totalSecondsToHHMMSS } from '../services/timer/timer.model';

@Pipe({
  name: 'secondsToHHMMSS'
})
export class SecondsToHHMMSSPipe implements PipeTransform {

  transform(value: unknown): unknown {
    if (value > 0) {
      return totalSecondsToHHMMSS(value);
    }

    return defaultTime;
  }
}
