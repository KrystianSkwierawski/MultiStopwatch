import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PertCalculatorService } from '../../../services/pert-calculator/pert-calculator.service';

@Component({
  selector: 'app-pert-calculator-dialog',
  templateUrl: './pert-calculator-dialog.component.html',
  styleUrls: ['./pert-calculator-dialog.component.scss']
})
export class PertCalculatorDialogComponent implements OnInit {

  form: FormGroup;
  displayedColumns: string[] = ['chance', 'time'];
  dataSource;

  constructor(
    public dialogRef: MatDialogRef<PertCalculatorDialogComponent>,
    private formBulider: FormBuilder,
    private pertCalculatorService: PertCalculatorService
  ) { }

  ngOnInit(): void {
    this.form = this.formBulider.group({
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
  }

  calculate() {
    const optimisticValue = this.form.get('optimistic').value;
    const realisticValue = this.form.get('realistic').value;
    const pessimisticallyValue = this.form.get('pessimistically').value;

    const estimates: Estimates[] = this.pertCalculatorService.calculate(optimisticValue, realisticValue, pessimisticallyValue);

    this.updateTableData(estimates);
  }

  updateTableData(estimates: Estimates[]) {
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
    this.dialogRef.close();
  }
}
