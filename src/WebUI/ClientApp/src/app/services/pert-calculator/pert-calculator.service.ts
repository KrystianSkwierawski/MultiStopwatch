import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PertCalculatorService {

  chances: number[] = [2, 10, 16, 20, 25, 30, 40, 50, 60, 70, 75, 80, 84, 90, 98];
  values: number[] = [2, 1.28, 1, 0.84, 0.67, 0.52, 0.25, 0, 0.25, 0.52, 0.67, 0.84, 1, 1.28, 2];

  constructor() { }

  calculate(optimisticValue: number, realisticValue: number, pessimisticallyValue: number): Estimates[] {
    let estimates: Estimates[] = [];

    this.chances.forEach((chance, index) => {
      const expected: number = this.calculateExpected(optimisticValue, realisticValue, pessimisticallyValue);
      const deviation: number = this.calculateDeviation(pessimisticallyValue, optimisticValue);

      const time: number = index <= 7 ? expected - (this.values[index] * deviation) : expected + (this.values[index] * deviation);

      estimates.push({
        chance: chance,
        time: time
      });
    });

    return estimates;
  }

  private calculateExpected(optimisticValue: number, realisticValue: number, pessimisticallyValue: number): number {
    return (optimisticValue + (4 * realisticValue) + pessimisticallyValue) / 6;
  }

  private calculateDeviation(pessimisticallyValue: number, optimisticValue: number): number {
    return (pessimisticallyValue - optimisticValue) / 6;
  }
}
