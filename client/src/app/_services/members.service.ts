import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { map, of } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';
import { SetPaginatedResponse, SetPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private http = inject(HttpClient);
  private accountService = inject(AccountService)
  baseUrl =environment.apiUrl;
  paginatedResult = signal<PaginatedResult<Member[]> | null>(null); 
  memberCache = new Map();
  user = this.accountService.currentUser();
  userParams = signal<UserParams>(new UserParams(this.user));

  resetUserParams() {
    this.userParams.set(new UserParams(this.user));
  }
 

  getMembers() {
    const response = this.memberCache.get(Object.values(this.userParams()).join('-'));
    if(response) return SetPaginatedResponse(response, this.paginatedResult);
    
    
    console.log(Object.values(this.userParams).join('-'));

    let params = SetPaginationHeaders(this.userParams().pageNumber, this.userParams().pageSize);

    params = params.append('minAge', this.userParams().minAge);
    params = params.append('maxAge', this.userParams().maxAge);
    params = params.append('gender', this.userParams().gender);
    params = params.append('orderBy', this.userParams().orderBy);
     
     return this.http.get<Member[]>(this.baseUrl +'users',{observe: 'response', params}).subscribe({
      next: response =>{
        SetPaginatedResponse(response, this.paginatedResult);
        this.memberCache.set(Object.values(this.userParams()).join('-'), response);
      }
     })    
  }


  getMember(username: string){
    const member: Member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.body), [])
      .find((m: Member)=> m.username === username);
    if(member) return of(member);
    
    return this.http.get<Member>(this.baseUrl +'users/'+ username);

  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      // map(() => {
      //   const index = this.members.indexOf(member);
      //   this.members[index] = {...this.members[index], ...member}
      // })
    )
  }

  setMainPhoto(photoId: number){
    return this.http.put(this.baseUrl+ 'users/set-main-photo/' + photoId,{});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }
}













