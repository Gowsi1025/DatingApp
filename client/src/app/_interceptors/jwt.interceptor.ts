import { inject } from '@angular/core';
import { HttpInterceptorFn} from '@angular/common/http';
import { take } from 'rxjs';
import { AccountService } from '../_services/account.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountService);

  accountService.currentUser$.pipe(take(1)).subscribe({
    next: user =>{
      if (user) {
        req = req.clone({
          setHeaders:{
            Authorization: `Bearer ${user.token}`
          }
        })
      }
    }

  })

  return next(req)
}
