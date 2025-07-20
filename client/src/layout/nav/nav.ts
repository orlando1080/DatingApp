import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account.service';
import { LoginCredentials } from '../../types/User';

@Component({
  selector: 'app-nav',
  imports: [
    FormsModule
  ],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  protected credentials = {} as LoginCredentials;
  protected accountService: AccountService = inject(AccountService);

  login(): void {
    this.accountService.login(this.credentials).subscribe({
      next: (response) => {
        console.log(response)
      },
      error: (err: Error) => {
        alert(err.message);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }

  logout(): void {
    this.accountService.logout();
    this.credentials = {
      email: '',
      password: ''
    };
  }
}
