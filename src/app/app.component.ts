import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "./shared/authentication.service";
import {VaccinationRegistrationService} from "./shared/vaccination-registration.service";
import {User} from "./shared/user";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user: User;

  constructor(private authService: AuthenticationService,
              private vr: VaccinationRegistrationService) { }


  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getLoginLabel(){
    if(this.isLoggedIn()){
      return "Account";
    } else {
      return "Login";
    }
  }

  checkUser() {
    if(this.isLoggedIn()) {
      this.vr.getUser(this.authService.getCurrentUserId()).subscribe(v => this.user = v);
      if(this.user != undefined) {
        if(this.user.admin) {
          return true;
        }
        return false;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }


}
