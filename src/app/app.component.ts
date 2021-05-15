import { Component } from '@angular/core';
import { AuthenticationService } from "./shared/authentication.service";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthenticationService) { }

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

}
