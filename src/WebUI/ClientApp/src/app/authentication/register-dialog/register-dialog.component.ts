import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {

  form: FormGroup;

  constructor(private authService: AuthenticationService,
    private formBulider: FormBuilder,
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.form = this.formBulider.group({
      email: ['', {
        validators: [Validators.required, Validators.email]
      }],
      password: ['', {
        validators: [Validators.required]
      }],
      confirmPassword: ['', {
        validators: [Validators.required]
      }],
    });
  }

  logout() {
    this.authService.logout();
  }

  onSubmit(form: HTMLFormElement) {
    this.authService.register(form).subscribe(() => {
      this.closeDialog("success");
    },
      error => console.log(error)
    );
  }

  closeDialog(success?: string): void {
    this.dialogRef.close(success);
  }
}
