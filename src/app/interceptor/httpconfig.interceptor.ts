import { Injectable } from '@angular/core';
import { ErrorDialogService } from '../error-dialog/errordialog.service';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(public errorDialogService: ErrorDialogService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // const token: string = localStorage.getItem('token');

    const token : string = btoa('admin' + ':' + 'district');

    if (token) {
      // request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
      request = request.clone({ headers: request.headers.set('Authorization', 'Basic ' + token) });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('the HttpInterceptor event--->>>', event);
          // this.errorDialogService.openDialog(event);
        }
        return event;
      }),

      catchError((error: HttpErrorResponse) => {

        let data = {};

        data = {
          reason: error && error.error.reason ? error.error.reason : '',
          status: error.status
        };

        this.errorDialogService.openDialog(data);
        return throwError(error);
      }));
  }
}
