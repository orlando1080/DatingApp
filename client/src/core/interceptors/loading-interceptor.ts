import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { BusyService } from '../services/busy.service';
import { inject } from '@angular/core';
import { delay, finalize, of, tap } from 'rxjs';

const cache = new Map<string, HttpEvent<unknown>>();
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService: BusyService = inject(BusyService);

  if (req.method === 'GET') {
    const cachedReq: HttpEvent<unknown> | undefined = cache.get(req.url);
    if (cachedReq) {
      return of(cachedReq);
    }
  }

  busyService.busy();

  return next(req).pipe(
    delay(500),
    tap(response => cache.set(req.url, response)),
    finalize(() => busyService.idle())
  );
};
