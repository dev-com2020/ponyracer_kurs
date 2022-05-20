import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserModel } from './models/user.model';


@Injectable({
    providedIn: 'root'
  })
  export class UserService {

    userEvents = new BehaviorSubject<UserModel | null>(null);

      constructor(private http: HttpClient) {
        this.retrieveUser();
      }

      register(login: string, password: string, birthYear: number): Observable<UserModel>{
          const body = { login, password, birthYear};
          return this.http.post<UserModel>('https://ponyracer.ninja-squad.com/api/users',body)
      }

      authenticate(credentials: {login: string; password: string}): Observable<UserModel>{
          return this.http
          .post<UserModel>('https://ponyracer.ninja-squad.com/api/users/authentication',credentials)
          .pipe(tap((user: UserModel) => this.userEvents.next(user)));
      }

      storeLoggedInUser(user: UserModel): void{
        window.localStorage.setItem('rembemerMe', JSON.stringify(user));
        this.userEvents.next(user);
      }


      retrieveUser(): void{
        const value = window.localStorage.getItem('rememberMe');
        if (value){
          const user = JSON.parse(value) as UserModel;
          this.userEvents.next(user);
        }
      }

      logout():void{
        this.userEvents.next(null);
        window.localStorage.removeItem('rememberMe');
      }
  }