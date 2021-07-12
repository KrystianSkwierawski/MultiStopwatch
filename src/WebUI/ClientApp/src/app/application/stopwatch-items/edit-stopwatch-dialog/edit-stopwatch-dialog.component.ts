import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalChangesHubService } from '../../../shared/services/local-changes-hub/local-changes-hub.service';
import { StopwatchItemDto, StopwatchItemsClient, UpdateStopwatchItemCommand } from '../../../web-api-client';

@Component({
  selector: 'app-edit-stopwatch-dialog',
  templateUrl: './edit-stopwatch-dialog.component.html',
  styleUrls: ['./edit-stopwatch-dialog.component.scss']
})
export class EditStopwatchDialogComponent implements OnInit {

  form: FormGroup;

  constructor(private _dialogRef: MatDialogRef<EditStopwatchDialogComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public stopwatchItem: StopwatchItemDto,
    private _stopwatchItemsClient: StopwatchItemsClient) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      title: ['', {
        validators: [Validators.required, Validators.maxLength(20)]
      }],
      time: ['', {
        validators: [Validators.required, Validators.pattern(/^[0-9]{2,5}:[0-9]{2}:[0-9]{2}$/)]
      }],
      theme: ['', {
        validators: Validators.required
      }],
    });

    if (this.stopwatchItem !== undefined) {
      this.form.patchValue(this.stopwatchItem);
    }
  }

  onSubmit(form: HTMLFormElement) {
    this.stopwatchItem.title = form.title;
    this.stopwatchItem.time = form.time;
    this.stopwatchItem.theme = form.theme;

    this._stopwatchItemsClient.update(UpdateStopwatchItemCommand.fromJS(this.stopwatchItem)).subscribe(() => {
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

  getErrorMessageFieldTime() {
    const field = this.form.get('time');

    if (field.hasError('required')) {
      return 'The time field is required';
    }

    if (field.hasError('pattern')) {
      return 'The time field must be formated - "00:00:00';
    }

    return '';
  }


  changeSelectedTheme(theme: string) {
    this.form.get('theme').setValue(theme);
    this.form.markAsDirty();
  }

  closeDialog(success?): void {
    this._dialogRef.close(success);
  }
}
