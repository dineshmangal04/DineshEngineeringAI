import { Injectable } from '@angular/core';
import { ErrorDialogService } from '../../error-dialog/errordialog.service';
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
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(public errorDialogService: ErrorDialogService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    request = request.clone({ headers: request.headers.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS"') });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {

          // this.errorDialogService.openDialog(event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let data = {}, message = '';
        switch (error['status']) {
          case 404:
            message = 'Error: Not found';
            break;
          case 400:
            message = 'Error: Bad request';
            break;
          case 500:
            message = 'Error: Something went wrong';
        }
        data = {
          reason: message ? message : (error && error.error.reason ? error.error.reason : ''),
          status: error.status
        };
        this.errorDialogService.openDialog(data);
        return throwError(error);
      }));
  }
}
