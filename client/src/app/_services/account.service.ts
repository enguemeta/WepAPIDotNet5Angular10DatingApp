import { environment } from './../../environments/environment';
import { User } from './../_models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
   private baseUrl = environment.apiUrl;
   private currentUserSource = new ReplaySubject<User>(1);
   public currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  // tslint:disable-next-line:typedef
  public login(model: any) {
    return this.http.post(`${this.baseUrl}account/login`, model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
          
        }
      }),
    );
  }


  public register(model: any) {
    return this.http.post(this.baseUrl + 'accout/register', model).pipe(
      map((user: User) => {
        if(user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  public setCurrentUser(user : User){
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  // tslint:disable-next-line:typedef
  public logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
