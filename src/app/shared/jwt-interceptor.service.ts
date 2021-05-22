import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest, HttpResponse
} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {Observable, throwError} from "rxjs";

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe( catchError(err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          return throwError("E-Mail und/oder Passwort sind falsch!");
        }

      }
    }));
  }
}
