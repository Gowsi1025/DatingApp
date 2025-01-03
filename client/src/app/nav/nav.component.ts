import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgIf, AsyncPipe} from '@angular/common';
import { HasRoleDirective } from '../_directives/has-role.directive';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
    standalone: true,
    imports: [RouterLink, RouterLinkActive, NgIf, BsDropdownModule, FormsModule, AsyncPipe, HasRoleDirective]
})
export class NavComponent implements OnInit {

  model: any ={};
  currentUser$: Observable<User | null> = of(null) 
  currentUser: any;

  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void{
    this.currentUser = this.accountService.currentUser;
  }
  

  login() {
    this.accountService.login(this.model).subscribe({
      next:() => this.router.navigateByUrl('/members'),
    })
  }
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
  

}
