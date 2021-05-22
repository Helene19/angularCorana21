import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication.service";
import { User } from "../shared/user";
import { VaccinationRegistrationService } from "../shared/vaccination-registration.service";
import { VaccinationPlace } from "../shared/vaccination-place";

interface Response {
  access_token: string;
}

@Component({
  selector: 'bs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: User;
  error: '';
  vaccinationPlaces: VaccinationPlace[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private vr: VaccinationRegistrationService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
    if(this.authService.isLoggedIn()) {
      this.vr.getUser(this.authService.getCurrentUserId()).subscribe(v => this.user = v);
    }
    this.vr.getAllPlaces().subscribe(res => this.vaccinationPlaces = res);
  }

  login() {
    const val = this.loginForm.value;
    if (val.username && val.password) {
      this.authService.login(val.username, val.password).subscribe(res => {
        this.authService.setSessionStorage((res as
          Response).access_token);
        this.router.navigateByUrl("/");
      },
        error => {
          this.error = error;
        });

    }
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }

  checkUser() {
    if (this.user != undefined) {
      return true;
    } else {
      return false;
    }
  }

}
