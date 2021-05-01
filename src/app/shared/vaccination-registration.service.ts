import { Injectable } from '@angular/core';
import { Vaccination, VaccinationPlace, User } from "./vaccination";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VaccinationRegistrationService {

  private api = 'https://corana21.s1810456033.student.kwmhgb.at/api'

    constructor(private http: HttpClient) { }

  getAll() : Observable<Array<Vaccination>> {
    return this.http.get(`${this.api}/vaccinations`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
