import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Nav } from '../layout/nav/nav';
import { User } from '../types/User';
import { AccountService } from '../core/services/account.service';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, Nav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected members = signal<User[]>([]);
  protected title: string = 'Dating App';
  protected router: Router = inject(Router);
  private http: HttpClient = inject(HttpClient)
  private destroyRef = inject(DestroyRef);
  private accountService: AccountService = inject(AccountService);

  ngOnInit() {
    const subscription = this.http.get<User[]>('https://localhost:5001/api/members').subscribe({
      next: (res) => {
        this.members.set(res);
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        console.log('complete')
      }
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })

    this.setCurrentUser();
  }

  setCurrentUser(): void {
    const userString: string | null = localStorage.getItem('currentUser');
    if (!userString) {
      return;
    }

    const user: User = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }
}
