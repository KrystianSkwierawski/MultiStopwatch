import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { ProjectItemDto } from '../../web-api-client';

@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.scss']
})
export class CreateProjectDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateProjectDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ProjectItemDto) { };

  form: FormGroup

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', {
        validators: [Validators.required, Validators.maxLength(20)]
      }]
    });
  }

  getErrorMessageFieldTitle() {
    const field = this.form.get('title');

    if (field.hasError('required')) {
      return 'The title field is required';
    }

    if (field.hasError('maxlength')) {
      return 'The maximum title length is 20';
    }

    return '';
  }

  hideDialog(): void {
    this.dialogRef.close();
  }
}
