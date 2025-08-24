import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../../../types/Member';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [
    DatePipe
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  protected member: WritableSignal<Member | undefined> = signal<Member | undefined>(undefined);

  ngOnInit(): void {
    this.route.parent?.data?.subscribe({
      next: (data) => {
        this.member.set(data['member']);
      }
    })
  }
}
