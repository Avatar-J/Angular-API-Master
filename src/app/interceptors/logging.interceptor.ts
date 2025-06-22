import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Outgoing HTTP Request:', req);

  return next(req).pipe(
    tap({
      next: (event) => {
        console.log('Incoming HTTP Response:', event);
      },
      error: (error) => {
        console.error('Incoming HTTP Error:', error);
      },
    })
  );
};
