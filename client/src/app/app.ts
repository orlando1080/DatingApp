import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Nav } from '../layout/nav/nav';
import { User } from '../types/User';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, Nav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected members = signal<User[]>([]);
  protected router: Router = inject(Router);
}
