import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateProjectItemCommand, ProjectItemDto, ProjectItemsClient } from '../../../web-api-client';

@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.scss']
})
export class CreateProjectDialogComponent implements OnInit {

  form: FormGroup;

  constructor(public _dialogRef: MatDialogRef<CreateProjectDialogComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public projectItem: ProjectItemDto,
    private _projectItemsClient: ProjectItemsClient) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      title: ['', {
        validators: [Validators.required, Validators.maxLength(20)]
      }],
      theme: ['', {
        validators: Validators.required
      }],
    });
  }

  onSubmit(projectItem: ProjectItemDto) {
    this._projectItemsClient.create(CreateProjectItemCommand.fromJS(projectItem)).subscribe(() => {
      this.closeDialog('success');
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

  changeSelectedTheme(theme: string) {
    this.form.get('theme').setValue(theme);
  }

  closeDialog(success?: string): void {
    this._dialogRef.close(success);
  }
}
