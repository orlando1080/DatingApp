import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account.service';
import { LoginCredentials } from '../../types/User';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-nav',
  imports: [
    FormsModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  protected credentials = {} as LoginCredentials;
  protected accountService: AccountService = inject(AccountService);
  private router: Router = inject(Router);
  private toastService: ToastService = inject(ToastService);

  protected login(): void {
    this.accountService.login(this.credentials).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/members');
        const displayName: string = response.displayName.charAt(0).toUpperCase() + response.displayName.slice(1);
        this.toastService.success(`${displayName} you have logged in successfully!`);
        console.log(response)
      },
      error: (err) => {
        console.log(err);
        this.toastService.error(err.error);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }

  protected logout(): void {
    this.accountService.logout();
    this.credentials = {
      email: '',
      password: ''
    };
  }
}
