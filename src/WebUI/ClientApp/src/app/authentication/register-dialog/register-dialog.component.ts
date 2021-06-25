import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('')
    });
  }


   register() {

     const user = {
       email: this.registerForm.value.email,
       password: this.registerForm.value.password,
       confirmPassword: this.registerForm.value.confirm
    };

    this.authService.register(user);
  }
}
