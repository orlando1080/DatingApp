import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account.service';
import { LoginCredentials } from '../../types/User';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast.service';
import { themes } from '../themes.constant';

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
export class Nav implements OnInit {
  protected credentials = {} as LoginCredentials;
  protected accountService: AccountService = inject(AccountService);
  protected themes: string[] = themes;
  protected currentTheme: WritableSignal<string> = signal<string>(localStorage.getItem('theme') || 'light');
  private router: Router = inject(Router);
  private toastService: ToastService = inject(ToastService);

  ngOnInit(): void {
    localStorage.getItem('theme');
    document.documentElement.setAttribute('data-theme', this.currentTheme());
  }

  protected toggleTheme(theme: string): void {
    const newTheme: string = theme;
    this.currentTheme.set(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    const element = document.activeElement as HTMLElement;

    if (element) {
      element.blur();
    }
  }
  protected login(): void {
    this.accountService.login(this.credentials).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/members');
        const displayName: string = response.displayName.charAt(0).toUpperCase() + response.displayName.slice(1);
        this.toastService.success(`${displayName} you have logged in successfully!`);
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
