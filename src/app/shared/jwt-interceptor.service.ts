import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap( (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          alert("E-Mail Adresse und/oder Passwort sind falsch!");
        }
      }
    }));
  }
}
