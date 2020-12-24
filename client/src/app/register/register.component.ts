import { AccountService } from './../_services/account.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   @Input() usersFromHomeComponent: any;
   @Output() cancelRegister = new EventEmitter();

   public model: any = {};

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register () {
    this.accountService.register(this.model).subscribe(response => {
      this.cancel();
    }, (error) => {
      console.error(error);
      this.toastr.error(error.error);
    })
  }

  cancel () {
    this.cancelRegister.emit(false);
  }


}
