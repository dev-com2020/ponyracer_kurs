import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationFailed = false;
  loginCtrl: FormControl;
  passwordCtrl: FormControl;
  confirmPasswordCtrl: FormControl;
  birthYearCtrl: FormControl;
  userForm: FormGroup;
  passwordGroup: FormGroup;

  constructor(fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
    this.passwordCtrl = fb.control('', Validators.required);
    this.confirmPasswordCtrl = fb.control('', Validators.required);
    this.passwordGroup = fb.group(
      {
        password: this.passwordCtrl,
        confirmPassword: this.confirmPasswordCtrl
      },
      {
        validators: RegisterComponent.passwordMatch
      }
    );
    this.birthYearCtrl = fb.control('', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]);
    this.userForm = fb.group({
      login: this.loginCtrl,
      passwordForm: this.passwordGroup,
      birthYear: this.birthYearCtrl
    });
  }

  static passwordMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')!.value;
    const confirmPassword = control.get('confirmPassword')!.value;
    return password !== confirmPassword ? { matchingError: true } : null;
  }

  register(): void {
    this.userService
      .register(this.userForm.value.login, this.userForm.value.passwordForm.password, this.userForm.value.birthYear)
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: () => (this.registrationFailed = true)
      });
  }
}

