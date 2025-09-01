import { Component, HostListener, inject, OnDestroy, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { EditMember, Member } from '../../../types/Member';
import { DatePipe } from '@angular/common';
import { MemberService } from '../../../core/services/member.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';
import { AccountService } from '../../../core/services/account.service';
import { User } from '../../../types/User';

@Component({
  selector: 'app-profile',
  imports: [
    DatePipe,
    FormsModule
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit, OnDestroy {
  @ViewChild('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) notifyBeforeUnload($event: any) {
    if(this.editForm?.dirty) {
      $event.preventDefault();
    }
  }

  protected editMember: EditMember = {
    displayName: '',
    description: '',
    country: '',
    city: ''
  }
  protected memberService: MemberService = inject(MemberService);
  private accountService: AccountService = inject(AccountService);
  private toast: ToastService = inject(ToastService);

  ngOnInit(): void {
    this.editMember = {
      displayName: this.memberService.member()?.displayName || '',
      description: this.memberService.member()?.description || '',
      country: this.memberService.member()?.country || '',
      city: this.memberService.member()?.city || ''
    }
  }

  protected updateProfile(): void {
    if (!this.editMember) {
      return;
    }
    const currentUser: User | null = this.accountService.currentUser();
    const updatedMember = {...this.memberService.member(), ...this.editMember};

    this.memberService.updateMember(this.editMember).subscribe({
      next: () => {
        this.toast.success('Profile updated successfully!');

        if (currentUser && currentUser.displayName !== updatedMember.displayName) {
          currentUser.displayName = updatedMember.displayName;
          this.accountService.currentUser.set(currentUser);
        }

        this.memberService.isEditMode.set(false);
        this.memberService.member?.set(updatedMember as Member);
        this.editForm?.reset(updatedMember);
      }
    });
  }

  ngOnDestroy(): void {
    if(this.memberService.isEditMode()) {
      this.memberService.isEditMode.set(false);
    }
  }
}
