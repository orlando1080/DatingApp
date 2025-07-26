import { inject, Injectable } from '@angular/core';
import { User } from '../../types/User';
import { Observable, of } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  private accountService: AccountService = inject(AccountService);

  init(): Observable<null> {
    const userString: string | null = localStorage.getItem('currentUser');
    if (!userString) {
      return of(null);
    }

    const user: User = JSON.parse(userString);
    this.accountService.currentUser.set(user);
    return of(null);
  }

}
