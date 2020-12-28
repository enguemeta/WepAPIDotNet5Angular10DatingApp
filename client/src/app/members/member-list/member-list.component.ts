import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  public members$: Observable<Member[]>;
  constructor(private memberServices: MembersService) { }

  ngOnInit(): void {
   // this.loaderMembers();
   this.members$ = this.memberServices.getMembers();
  }

  // loaderMembers() {
  //   this.memberServices.getMembers().subscribe((members) => {
  //     this.members = members;
  //   })
  // }

}
