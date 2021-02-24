import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, } from '@angular/material/dialog';
import { ProjectItemDTO } from '../project-item.module';

@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.scss']
})
export class CreateProjectDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateProjectDialogComponent>, private formBuilder: FormBuilder) { };

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
