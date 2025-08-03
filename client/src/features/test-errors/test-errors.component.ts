import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  standalone: true,
  imports: [],
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.css'
})
export class TestErrors {
  protected baseUrl: string = 'https://localhost:5001/api/';
  private readonly http: HttpClient = inject(HttpClient);
  validationErrors = signal([])

  get404Error() {
    this.http.get(`${this.baseUrl}buggy/not-found`).subscribe({
      next: res => console.log(res),
      error: err => console.log(err),
      complete: () => console.log('complete')
    });
  }

  get400Error() {
    this.http.get(`${this.baseUrl}buggy/bad-request`).subscribe({
      next: res => console.log(res),
      error: err => console.log(err),
      complete: () => console.log('complete')
    });
  }

  get401Error() {
    this.http.get(`${this.baseUrl}buggy/auth`).subscribe({
      next: res => console.log(res),
      error: err => console.log(err),
      complete: () => console.log('complete')
    });
  }

  get500Error() {
    this.http.get(`${this.baseUrl}buggy/server-error`).subscribe({
      next: res => console.log(res),
      error: err => console.log(err),
      complete: () => console.log('complete')
    });
  }

  get400ValidationError() {
    this.http.post(`${this.baseUrl}account/register`, {}).subscribe({
      next: res => console.log(res),
      error: err => {
        console.log(err);
        this.validationErrors.set(err);
      },
      complete: () => console.log('complete')
    });
  }
}
