import { Component, inject, OnInit } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { AccountService } from './_services/account.service';
import { IUser } from './_models/user.interface';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title: string = 'Dating App';
  private accountService: AccountService = inject(AccountService);

  ngOnInit(): void {
    this.setCurrentUser()
  }

  setCurrentUser(): void {
    const userString: string | null = localStorage.getItem('user');

    if (!userString) {
      return;
    }

    const user: IUser = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }
}
