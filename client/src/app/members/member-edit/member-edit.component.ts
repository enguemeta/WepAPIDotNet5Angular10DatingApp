import { ToastrService } from 'ngx-toastr';
import { MembersService } from 'src/app/_services/members.service';
import { Member } from './../../_models/member';
import { AccountService } from './../../_services/account.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/user';
import { take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
 public member: Member;
 public user: User;

 @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any){

   if(this.editForm !== undefined && this.editForm.dirty) {
     $event.returnValue = true;
   }
 }

  constructor(private accountService: AccountService, private membersService: MembersService,
     private toastrService: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => this.user = user);
   }

  ngOnInit() {
    this.loadMember();
  }

  loadMember() {
    this.membersService.getMember(this.user.username).subscribe((member) => {
      this.member = member;
    })
  }

  public updateMember() {
    this.membersService.updateMember(this.member).subscribe(() => {
      this.toastrService.success('Profile updated successfully');
      this.editForm.reset(this.member);
    });    
  }
}
