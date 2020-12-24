import { AccountService } from './../_services/account.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   @Input() usersFromHomeComponent: any;
   @Output() cancelRegister = new EventEmitter();

   public model: any = {};

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  register () {
    this.accountService.register(this.model).subscribe(response => {
      this.cancel();
    }, error => {
      console.error(error);
    })
  }

  cancel () {
    this.cancelRegister.emit(false);
  }


}
