import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../services/account.service';
import { User } from '../../types/User';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService: AccountService = inject(AccountService);
  const user: User | null = accountService.currentUser();

  if (user) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    });
  }
  return next(req);
};
