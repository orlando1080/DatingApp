import {Component, inject, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AccountService} from "../_services/account.service";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  @Input() title!: string;
  model: any = {};
  accountService: AccountService = inject(AccountService);

  login(): void {
    this.accountService.login(this.model).subscribe({
      next: res => {
        console.log(res);
        },
        error: err => {
          console.log(err);
        },
        complete: () => {
          console.log('Loggin Complete');
        }
    })
  }

  logout() {
    this.accountService.logout();
  }
}
