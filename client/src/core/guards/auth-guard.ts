import { CanActivateFn } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { inject } from '@angular/core';
import { AccountService } from '../services/account.service';

export const authGuard: CanActivateFn = () => {
  const accountService = inject(AccountService);
  const toast = inject(ToastService);

  if (accountService.currentUser()) {
    return true;
  } else {
    toast.error('You must be logged in to view this page.');
    return false;
  }
};
