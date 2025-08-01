import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ToastService } from '../services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast: ToastService = inject(ToastService);
  const router: Router = inject(Router);
  
  return next(req).pipe(
    catchError(error => {
      if (error) {
        switch (error.status) {
          case '400':
            toast.error(error.error);
            break;
          case '500':
            toast.error('server error');
            break;
          case '401':
            toast.error('unauthorised');
            break;
          case '404':
            toast.error('not found')
            break;
          default:
            toast.error('unknown error');
            break;
        }
      }
    
    return error;
    })
  )
};
