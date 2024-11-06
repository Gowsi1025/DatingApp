import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { LikesService } from './likes.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  private likeService = inject(LikesService);
  baseUrl =environment.apiUrl;
  currentUser = signal<User | null> (null);


  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(      
       map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
       })
    )
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if(user) {
          this.setCurrentUser(user);
        }
      })
    )
  }
  setCurrentUser(user : User) {
    localStorage.setItem('user', JSON.stringify(user))
    this.currentUser.set(user);
    this.likeService.getLikeIds();
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
