import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import jwt_decode from "jwt-decode";
import { catchError, retry } from "rxjs/operators";
import { User } from "./user";
import {Observable} from "rxjs";
import {VaccinationRegistrationService} from "./vaccination-registration.service";

interface Token {
  exp: number;
  user: {
    id: string;
  };
}

@Injectable()
export class AuthenticationService {
  private api: string =
    "https://corana21.s1810456033.student.kwmhgb.at/api/auth";

  user: User;

  constructor(private http: HttpClient,
              private vr: VaccinationRegistrationService) {}

  login(email: string, password: string) {
    return this.http.post(`${this.api}/login`, {
      email: email,
      password: password
    });
  }

  public getCurrentUserId() {
    return Number.parseInt(sessionStorage.getItem("userId"));
  }

  public setSessionStorage(token: string) {
    const decodedToken = jwt_decode(token) as Token;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", decodedToken.user.id);
  }

  logout() {
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
  }

  public isLoggedIn() {
    if (sessionStorage.getItem("token")) {
      let token: string = sessionStorage.getItem("token");
      const decodedToken = jwt_decode(token) as Token;
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);

      if (expirationDate < new Date()) {
        sessionStorage.removeItem("token");
        return false;
      }
      return true;

    } else {
      return false;
    }
  }

}
