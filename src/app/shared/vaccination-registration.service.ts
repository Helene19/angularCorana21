import { Injectable } from '@angular/core';
import { Vaccination, VaccinationPlace, User } from "./vaccination";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class VaccinationRegistrationService {
  vaccinations: Vaccination[];

  private api = 'https://corana21.s1810456033.student.kwmhgb.at/api'

  constructor(private http: HttpClient) { }

  getAll() : Observable<Array<Vaccination>> {
    return this.http.get(`${this.api}/vaccinations`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllPlaces() : Observable<Array<VaccinationPlace>> {
    return this.http.get(`${this.api}/vaccinationplaces`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingle(vaccinationNr : number) : Observable<Vaccination> {
    return this.http.get(`${this.api}/vaccination/${vaccinationNr}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getUser(userId : number) : Observable<User> {
    return this.http.get(`${this.api}/user/${userId}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(vaccination: Vaccination): Observable<any> {
    return this.http.post(`${this.api}/vaccination`, vaccination)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  update(vaccination: Vaccination): Observable<any> {
    return this.http.put(`${this.api}/vaccination/${vaccination.vaccination_nr}`, vaccination)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  remove(vaccinationNr: number): Observable<any> {
    return this.http.delete(`${this.api}/vaccination/${vaccinationNr}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  check(vaccinationNr: number): Observable<Boolean> {
    return this.http.get<Boolean>(`${this.api}/vaccination/checkNr/${vaccinationNr}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  editToVaccinated(user: User): Observable<any> {
    return this.http.put(`${this.api}/vaccination/user/${user.id}`, user)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  registerToVaccination(vaccination: Vaccination,  userid: number): Observable<any> {
    let user = '{ "userId": '+userid+'}';
    let userJson = JSON.parse(user);
    return this.http.put(`${this.api}/vaccination/registration/${vaccination.vaccination_nr}`, userJson)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
