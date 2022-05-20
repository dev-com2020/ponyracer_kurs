import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'pr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

  loginCtrl: FormControl;
  passwordCtrl: FormControl;
  birthYearCtrl: FormControl;
  userForm: FormGroup;
  
  constructor(fb: FormBuilder){
    this.loginCtrl = fb.control('',Validators.required)
    this.passwordCtrl = fb.control('',Validators.required)
    this.birthYearCtrl = fb.control('',Validators.required)
    this.userForm = fb.group({
      login: this.loginCtrl,
      passwordCtrl: this.passwordCtrl,
      birthYear: this.birthYearCtrl
    });
  }
register(): void{}

}
