import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiError } from '../../types/ApiError';
import { Location } from '@angular/common';

@Component({
  selector: 'app-server-error',
  imports: [],
  templateUrl: './server-error.html',
  styleUrl: './server-error.css'
})
export class ServerError {
  protected error: ApiError;
  protected showDetails: boolean = false;
  private location: Location = inject(Location);
  private router: Router = inject(Router);

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    this.error = navigation?.extras?.state?.['error'];
  }

  showDetailsToggle() {
    this.showDetails = !this.showDetails;
  }

  goBack() {
    this.location.back();
  }
}
