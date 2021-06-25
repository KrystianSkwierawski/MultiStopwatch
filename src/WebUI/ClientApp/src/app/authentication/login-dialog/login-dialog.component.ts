import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  form: FormGroup;

  constructor(private authService: AuthenticationService,
    private formBulider: FormBuilder,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.form = this.formBulider.group({
      email: ['', {
        validators: [Validators.required, Validators.email]
      }],
      password: ['', {
        validators: [Validators.required]
      }],
    });
  }

  logout() {
    this.authService.logout();
  }

  onSubmit(form: HTMLFormElement) {
    this.authService.login(form).subscribe(authResponse => {
      if (authResponse.token) {
        this.closeDialog("success");
      }
    },
      error => console.log(error)
    );
  }

  closeDialog(success?: string): void {
    this.dialogRef.close(success);
  }
}
