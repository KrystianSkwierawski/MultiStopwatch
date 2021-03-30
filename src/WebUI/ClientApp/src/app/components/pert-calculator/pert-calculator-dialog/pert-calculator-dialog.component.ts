import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pert-calculator-dialog',
  templateUrl: './pert-calculator-dialog.component.html',
  styleUrls: ['./pert-calculator-dialog.component.scss']
})
export class PertCalculatorDialogComponent implements OnInit {

  optimisticValue: number = 0;
  realisticValue: number = 0;
  pessimisticallyValue: number = 0;

  form: FormGroup
  displayedColumns: string[] = ['chance', 'unit'];
  dataSource;

  constructor(public dialogRef: MatDialogRef<PertCalculatorDialogComponent>, private formBulider: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBulider.group({
      optimistic: [0, {
        validators: [Validators.required]
      }],
      realistic: [0, {
        validators: [Validators.required]
      }],
      pessimistically: [0, {
        validators: [Validators.required]
      }]
    })
  }

  calculate() {
    let estimates: Estimates[] = [];

    const chances: number[] = [2, 10, 16, 20, 25, 30, 40, 50, 60, 70, 75, 80, 84, 90, 98];
    const values: number[] = [2, 1.28, 1, 0.84, 0.67, 0.52, 0.25, 0, 0.25, 0.52, 0.67, 0.84, 1, 1.28, 2]

    this.optimisticValue = this.form.get('optimistic').value;
    this.realisticValue = this.form.get('realistic').value;
    this.pessimisticallyValue = this.form.get('pessimistically').value;


    chances.forEach((chance, index) => {
      const expected: number = this.calculateExpected();
      const deviation: number = this.calculateDeviation();

      const unit: number = index <= 7 ? expected - (values[index] * deviation) : expected + (values[index] * deviation);

      estimates.push({
        chance: chance,
        unit: unit
      });
    });

    this.dataSource = new MatTableDataSource<any>(estimates);
  }


  calculateExpected(): number {
    return (this.optimisticValue + (4 * this.realisticValue) + this.pessimisticallyValue) / 6;
  }

  calculateDeviation(): number {
    return (this.pessimisticallyValue - this.optimisticValue) / 6;
  }

  hideDialog(): void {
    this.dialogRef.close();
  }
}
