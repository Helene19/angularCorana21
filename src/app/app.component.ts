import { Component } from '@angular/core';
import { AuthenticationService } from "./shared/authentication.service";
import { VaccinationRegistrationService } from "./shared/vaccination-registration.service";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  {

  userAdmin = null;

  constructor(private authService: AuthenticationService,
              private vr: VaccinationRegistrationService) {
  }

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

  isAdmin() {
    this.userAdmin = this.authService.isAdmin();
    if(this.isLoggedIn()) {
      if(this.userAdmin == "1") {
        return true;
      }
      return false;
    }
  }

}
