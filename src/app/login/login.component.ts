import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'pr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

credentials = {
  login: '',
  password: ''
};
authenticationFailed = false;

  constructor(private router: Router, private userService: UserService) {}

    authenticate(): void{
      this.authenticationFailed = false;
      this.userService.authenticate(this.credentials).subscribe({
        next: () => this.router.navigate(['/']),
        error: () => (this.authenticationFailed = true)
      });
    }
   }