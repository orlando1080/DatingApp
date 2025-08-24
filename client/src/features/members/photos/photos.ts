import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member, photo } from '../../../types/Member';

@Component({
  selector: 'app-photos',
  imports: [],
  templateUrl: './photos.html',
  styleUrl: './photos.css'
})
export class Photos implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  protected photos = signal<photo[]>([]);

  ngOnInit(): void {
    this.route.parent?.data.subscribe({
      next: (data) => {
        this.photos.set(data['photo']);
      }
    });
  }

  get photoMocks() {
    return Array.from({length: 20}, (_, i) => ({
      url: '/user.png'
    }))
  }
}
