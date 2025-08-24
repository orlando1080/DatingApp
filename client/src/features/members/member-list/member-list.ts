import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MemberService } from '../../../core/services/member.service';
import { Observable } from 'rxjs';
import { Member } from '../../../types/Member';
import { MemberCard } from '../member-card/member-card';

@Component({
  selector: 'app-member-list',
  imports: [AsyncPipe, MemberCard],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css'
})
export class MemberList {
  private membersService: MemberService = inject(MemberService);
  protected members$: Observable<Array<Member>>;

  constructor() {
    this.members$ = this.membersService.getMembers();
  }
}
