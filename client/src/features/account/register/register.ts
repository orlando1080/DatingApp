import { Component, inject, output } from '@angular/core';
import { RegisterCredentials } from '../../../types/User';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../core/services/account.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  protected credentials = {} as RegisterCredentials;
  protected isCancelled = output<boolean>();
  private accountService: AccountService = inject(AccountService);

  register(): void {
    this.accountService.register(this.credentials).subscribe({
      next: (response) => {
        console.log(response)
        this.cancel();
      },
      error: (err: Error) => {
        alert(err.message);
      },
      complete: () => {
        console.log('complete');
      }
    })
  }

  cancel(): void {
    console.log('cancelled!');
    this.isCancelled.emit(false);
  }
}
