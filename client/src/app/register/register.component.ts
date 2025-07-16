import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AccountService } from "../_services/account.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  cancelRegister = output<boolean>();
  model: any = {};
  private accountService: AccountService = inject(AccountService);

  register(): void {
    this.accountService.register(this.model).subscribe({
      next: res => {
        console.log(res);
        this.cancel();
        },
        error: err => {
          console.log(err);
        },
        complete: () => {
          console.log('Register Complete');
        }
    });
  }

  cancel(): void {
    this.cancelRegister.emit(false);
  }

}
