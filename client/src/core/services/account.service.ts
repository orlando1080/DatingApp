import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginCredentials, RegisterCredentials, User } from '../../types/User';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = environment.apiUrl;
  currentUser = signal<User | null>(null);

  login(credentials: LoginCredentials): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}account/login`, credentials).pipe(
      tap(user => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  logout(): void {
    localStorage.clear();
    this.currentUser.set(null);
  }

  register(credentials: RegisterCredentials): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}account/register`, credentials).pipe(
      tap(user => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  private setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser.set(user);
  }
}
