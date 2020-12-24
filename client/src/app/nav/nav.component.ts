import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from './../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {

  public model: any = {};
  //public currentUser$: Observable<User>;

  constructor(public accountService: AccountService) { }

  public ngOnInit(): void {
    //this.currentUser$ = this.accountService.currentUser$;
  }

  // tslint:disable-next-line:typedef
  public login() {
    this.accountService.login(this.model).subscribe((response) => {
       console.log(response);
      }, (error) => {
        console.error(error);
      });
  }
  // tslint:disable-next-line:typedef
  public logout() {
    this.accountService.logout();
  }

}
