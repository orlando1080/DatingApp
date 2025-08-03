import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req: any, next: any) => {
  const toast: ToastService = inject(ToastService);
  const router: Router = inject(Router);

  return next(req).pipe(
    catchError(error => {
      if (error) {
        switch (error.status) {
          case 400:
            if (error.error.errors) {
              const modelStateErrors = [];
              for (const key in error.error.errors) {
                if (error.error.errors.hasOwnProperty(key)){
                  modelStateErrors.push(error.error.errors[key]);
                }
              }
              throw modelStateErrors.flat()
            } else {
              toast.error(error.error);
            }
            break;
          case 500:
            const navigationExtras: NavigationExtras = { state: { error: error.error } };
            router.navigateByUrl('/server-error', navigationExtras);
            break;
          case 401:
            toast.error('Unauthorised');
            break;
          case 404:
            router.navigateByUrl('/not-found');
            break;
          default:
            toast.error('Unknown Error');
            break;
        }
      }

    return throwError(() => error);
    })
  )
};
