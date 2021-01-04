import { AccountService } from './account.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, pipe } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Member } from '../_models/member';
import { environment } from './../../environments/environment';
import { PaginatedResult } from './../_models/pagination';
import { UserParams } from './../_models/userParams';
import { User } from '../_models/user';

// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: 'Bearer ' + (JSON.parse(localStorage.getItem('user')))?.token,
//   }),
// };

@Injectable({
  providedIn: 'root',
})
export class MembersService {
 public baseUrl = environment.apiUrl;
 public members: Member[] = [];
 public memberCache = new Map();
 public user: User;
 public userParams: UserParams;

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user;
      this.userParams = new UserParams(user);
    });
  }

  public getUserParams() {
     return this.userParams;
   }

   public setUserParams(params: UserParams) {
    this.userParams = params;
  }

  public resetUserParams() {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }

  // tslint:disable-next-line:typedef
  public getMembers(userParams: UserParams) {
    const response = this.memberCache.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }

    let params = this.getPaginationHeaders(userParams.pageNumber,  userParams.pageSize);
    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return this.getPaginatedResult<Member[]>(`${this.baseUrl}users`, params)
      // tslint:disable-next-line:no-shadowed-variable
      .pipe(map((response) => {
          this.memberCache.set(Object.values(userParams).join('-'), response);
          return response;
      }));

  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {

    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return params;

  }

  public getMember(username: string) {
    const member = [...this.memberCache.values()]
     .reduce((arr, elem) => arr.concat(elem.result), [])
     // tslint:disable-next-line:no-shadowed-variable
     .find((member: Member) => member.username === username);

    if(member) {
       return of(member);
     }

    return this.http.get<Member>(`${this.baseUrl}users/${username}`);
  }

  public updateMember(member: Member) {
    return this.http.put<Member>(`${this.baseUrl}users`, member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      }),
    );
  }

  public setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  public deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }

  private getPaginatedResult<T>(url, params) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map((response) => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      }),
    );
  }

}
