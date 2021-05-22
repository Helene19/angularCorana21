import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import jwt_decode from "jwt-decode";

interface Token {
  exp: number;
  user: {
    id: string;
    admin: string;
  };
}

@Injectable()
export class AuthenticationService {
  private api: string =
    "https://corana21.s1810456033.student.kwmhgb.at/api/auth";


  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.api}/login`, {
      email: email,
      password: password
    });
  }

  public getCurrentUserId() {
    return Number.parseInt(sessionStorage.getItem("userId"));
  }

  public isAdmin() {
    return sessionStorage.getItem("userAdmin");
  }

  public setSessionStorage(token: string) {
    const decodedToken = jwt_decode(token) as Token;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", decodedToken.user.id);
    sessionStorage.setItem("userAdmin", decodedToken.user.admin);
  }

  logout() {
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userAdmin");
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
