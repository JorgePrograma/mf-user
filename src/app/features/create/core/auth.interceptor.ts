import {
  HttpEvent,
  HttpHandlerFn,
  HttpRequest
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Config } from './utils/config';

/**
 * Intercept
 *
 * @param req
 * @param next
 */
export const authInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  // Clone the request object
  let newReq = req.clone();

  newReq = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + Config.TOKEN),
  });

  // Response
  return next(newReq).pipe(
    catchError((error) => {
      return throwError(error);
    })
  );
};
