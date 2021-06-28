import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as EventEmitter from 'events';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';


@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  form: FormGroup;

  constructor(private authService: AuthenticationService,
    private dialog: MatDialog,
    private formBulider: FormBuilder,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private route: Router
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

        this.closeDialog();
        this.route.navigateByUrl("/projects");

      }
    },
      error => console.log(error)
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  openRegisterDialog() {
    this.closeDialog();

    this.dialog.open(RegisterDialogComponent, {
      panelClass: 'register-dialog'
    });
  }

}
