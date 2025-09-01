import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  public busyRequestCount: WritableSignal<number> = signal(0);

  busy(): void {
    this.busyRequestCount.update(count => count + 1);
  }

  idle(): void {
    this.busyRequestCount.update(count => Math.max(0, count - 1));
  }
}
