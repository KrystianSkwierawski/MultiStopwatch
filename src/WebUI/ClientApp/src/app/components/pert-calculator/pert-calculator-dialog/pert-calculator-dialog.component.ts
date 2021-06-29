import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { PertCalculatorService } from '../../../services/pert-calculator/pert-calculator.service';

@Component({
  selector: 'app-pert-calculator-dialog',
  templateUrl: './pert-calculator-dialog.component.html',
  styleUrls: ['./pert-calculator-dialog.component.scss']
})
export class PertCalculatorDialogComponent implements OnInit, OnDestroy {

  form: FormGroup;
  displayedColumns: string[] = ['chance', 'time'];
  dataSource;

  estimatesSub: Subscription;

  constructor(
    private _dialogRef: MatDialogRef<PertCalculatorDialogComponent>,
    private _formBulider: FormBuilder,
    private _pertCalculatorService: PertCalculatorService
  ) { }

  ngOnInit(): void {
    this.form = this._formBulider.group({
      optimistic: [0, {
        validators: [Validators.required, Validators.min(1)]
      }],
      realistic: [0, {
        validators: [Validators.required, Validators.min(1)]
      }],
      pessimistically: [0, {
        validators: [Validators.required, Validators.min(1)]
      }]
    });

    this.estimatesSub = this._pertCalculatorService.estimates.subscribe((estimates: Estimates[]) => {
      this.updateTableDataSource(estimates);
    });
  }

  calculate() {
    const optimisticValue = this.form.get('optimistic').value;
    const realisticValue = this.form.get('realistic').value;
    const pessimisticallyValue = this.form.get('pessimistically').value;

    this._pertCalculatorService.calculate(optimisticValue, realisticValue, pessimisticallyValue);
  }

  updateTableDataSource(estimates: Estimates[]) {
    this.dataSource = new MatTableDataSource<Estimates>(estimates);
  }

  getErrorMessage(inputName) {
    const field = this.form.get(inputName);

    if (field.hasError('required')) {
      return `The ${inputName} field is required`;
    }

    if (field.hasError('min')) {
      return `Minimum ${inputName} value is 1`;
    }

    return '';
  }

  hideDialog(): void {
    this._dialogRef.close();
  }

  ngOnDestroy(): void {
    this.estimatesSub.unsubscribe();
  }
}
