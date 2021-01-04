import { AccountService } from './../../_services/account.service';
import { UserParams } from './../../_models/userParams';
import { Pagination } from 'src/app/_models/pagination';
import { Pagination } from './../../_models/pagination';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  
  public members: Member[];
  public pagination: Pagination;
  public userParams: UserParams;
  public user: User;
  public genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];


  constructor(private membersService: MembersService) {
       this.userParams = this.membersService.getUserParams();
   }

  ngOnInit(): void {   
    this.loaderMembers();   
  }

   public loaderMembers() {
      this.membersService.setUserParams(this.userParams);
      this.membersService.getMembers(this.userParams).subscribe((response) => {
      this.members = response.result;
      this.pagination = response.pagination;
    })
   }

   public pageChanged(event: any) {
     this.userParams.pageNumber = event.page;
     this.membersService.setUserParams(this.userParams);
     this.loaderMembers();
   }

   public resetFilters() {
   this.userParams = this.membersService.resetUserParams();
   this.loaderMembers();
  }

}
