import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PertCalculatorService {

  private _chances: number[] = [2, 10, 16, 20, 25, 30, 40, 50, 60, 70, 75, 80, 84, 90, 98];
  private _values: number[] = [2, 1.28, 1, 0.84, 0.67, 0.52, 0.25, 0, 0.25, 0.52, 0.67, 0.84, 1, 1.28, 2];

  estimates: Subject<Estimates[]> = new Subject();

  constructor() { }

  calculate(optimisticValue: number, realisticValue: number, pessimisticallyValue: number) {
    const estimates: Estimates[] = [];

    this._chances.forEach((chance, index) => {
      const expected: number = this.calculateExpected(optimisticValue, realisticValue, pessimisticallyValue);
      const deviation: number = this.calculateDeviation(pessimisticallyValue, optimisticValue);

      const time: number = index <= 7 ? expected - (this._values[index] * deviation) : expected + (this._values[index] * deviation);

      estimates.push({
        chance: chance,
        time: time
      });
    });

    this.estimates.next(estimates);
  }

  private calculateExpected(optimisticValue: number, realisticValue: number, pessimisticallyValue: number): number {
    return (optimisticValue + (4 * realisticValue) + pessimisticallyValue) / 6;
  }

  private calculateDeviation(pessimisticallyValue: number, optimisticValue: number): number {
    return (pessimisticallyValue - optimisticValue) / 6;
  }
}
