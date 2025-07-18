import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'app-home',
    imports: [RegisterComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  registerMode: boolean = false;
  users: any;
  http: HttpClient = inject(HttpClient);

  ngOnInit(): void {
    this.getUsers();
  }

  registerToggle(): void {
    this.registerMode = !this.registerMode;
  }

  getUsers(): void {
    this.http.get('https://localhost:5001/api/users')
      .subscribe({
        next: res => {
          this.users = res;
        },
        error: err => {
          console.log(err);
        },
        complete: () => {
          console.log('complete');
        }
      });
  }

}
