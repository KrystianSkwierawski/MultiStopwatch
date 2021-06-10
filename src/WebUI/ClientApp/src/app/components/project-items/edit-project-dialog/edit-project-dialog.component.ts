import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectItemDto, ProjectItemsClient, UpdateProjectItemCommand } from '../../../web-api-client';

@Component({
  selector: 'app-edit-project-dialog',
  templateUrl: './edit-project-dialog.component.html',
  styleUrls: ['./edit-project-dialog.component.scss']
})
export class EditProjectDialogComponent implements OnInit {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditProjectDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public projectItem: ProjectItemDto,
    private projectItemsClient: ProjectItemsClient) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', {
        validators: [Validators.required, Validators.maxLength(20)]
      }],
      theme: ['', {
        validators: Validators.required
      }],
    });

    if (this.projectItem !== undefined) {
      this.form.patchValue(this.projectItem);
    }
  }

  onSubmit(form) {
    this.projectItem.title = form.title;
    this.projectItem.theme = form.theme;

    this.projectItemsClient.update(UpdateProjectItemCommand.fromJS(this.projectItem)).subscribe(() => {
      this.closeDialog("success");
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

  closeDialog(success?): void {
    this.dialogRef.close(success);
  }
}
