import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl =environment.apiUrl;
  currentUser = signal<User | null> (null);

  constructor(private http: HttpClient) { }

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
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
