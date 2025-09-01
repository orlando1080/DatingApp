import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Member } from '../../../types/Member';
import { AgePipe } from '../../../core/pipes/age-pipe';
import { MemberService } from '../../../core/services/member.service';
import { AccountService } from '../../../core/services/account.service';

@Component({
  selector: 'app-member-detailed',
  imports: [ RouterLink, RouterLinkActive, RouterOutlet, AgePipe ],
  templateUrl: './member-detailed.html',
  styleUrl: './member-detailed.css'
})
export class MemberDetailed implements OnInit {
  member: WritableSignal<Member | undefined> = signal<Member | undefined>(undefined);
  protected title: WritableSignal<string | undefined> = signal<string | undefined>('Profile');
  protected memberService: MemberService = inject(MemberService);
  protected accountService: AccountService = inject(AccountService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  isCurrentUser: Signal<boolean> = computed((): boolean => {
    return this.accountService.currentUser()?.id === this.route.snapshot.paramMap.get('id');
  })

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (data) => {
        this.member.set(data['member']);
      }
    });
    this.title.set(this.route.firstChild?.snapshot?.title);
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe({
      next: () => {
        this.title.set(this.route.firstChild?.snapshot?.title);
      }
    })
  }

  protected toggleEditMode() {
    return this.memberService.isEditMode.set(!this.memberService.isEditMode());
  }
}
