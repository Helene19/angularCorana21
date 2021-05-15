import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import jwt_decode from "jwt-decode";

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

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.api}/login`, {
      email: email,
      password: password
    });
  }

  public getCurrentUserId() {
    return Number.parseInt(localStorage.getItem("userId"));
  }

  public setLocalStorage(token: string) {
    const decodedToken = jwt_decode(token) as Token;
    localStorage.setItem("token", token);
    localStorage.setItem("userId", decodedToken.user.id);
  }

  logout() {
    this.http.post(`${this.api}/logout`, {});
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  }

  public isLoggedIn() {
    if (localStorage.getItem("token")) {
      let token: string = localStorage.getItem("token");
      const decodedToken = jwt_decode(token) as Token;
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);

      if (expirationDate < new Date()) {
        localStorage.removeItem("token");
        return false;
      }
      return true;

    } else {
      return false;
    }
  }

  public isAdmin() {

  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}
