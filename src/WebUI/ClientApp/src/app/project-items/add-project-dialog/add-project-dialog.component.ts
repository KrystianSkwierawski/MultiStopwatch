import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, } from '@angular/material/dialog';
import { ProjectItemDTO } from '../project-item.module';

@Component({
  selector: 'app-add-project-dialog',
  templateUrl: './add-project-dialog.component.html',
  styleUrls: ['./add-project-dialog.component.scss']
})
export class AddProjectDialogComponent implements OnInit {



  constructor(public dialogRef: MatDialogRef<AddProjectDialogComponent>, private formBuilder: FormBuilder) { };

  form: FormGroup

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', {
        validators: [Validators.required]
      }]
    });
  }

  hideDialog(): void {
    this.dialogRef.close();
  }


  addProject() {
    const projectItem: ProjectItemDTO = this.form.value;
    console.log(projectItem);
    this.hideDialog();  
  }
}
