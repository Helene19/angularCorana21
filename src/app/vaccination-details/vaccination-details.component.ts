import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Vaccination, VaccinationPlace, User } from "../shared/vaccination";
import { VaccinationRegistrationService } from "../shared/vaccination-registration.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication.service";
import {relative} from "@angular/compiler-cli/src/ngtsc/file_system";
import {element} from "protractor";

@Component({
  selector: 'bs-vaccination-details',
  templateUrl: './vaccination-details.component.html',
  styleUrls: ['./vaccination-details.component.css']
})
export class VaccinationDetailsComponent implements OnInit {

  vaccination: Vaccination;
  user: User;

  constructor(
    private vr: VaccinationRegistrationService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.vr.getSingle(params['vaccination_nr']).subscribe(v => this.vaccination = v);
    if(this.authService.isLoggedIn()) {
      this.vr.getUser(this.authService.getCurrentUserId()).subscribe(v => this.user = v);
    }
  }

  removeBook() {
    if (confirm('Impftermin wirklich löschen?')) {
      this.vr.remove(this.vaccination.vaccination_nr)
        .subscribe(res => this.router.navigate(['../'], { relativeTo:
          this.route }));
    }
  }

  editToVaccinated(user) {
    user.vaccinated = true;
    this.vr.editToVaccinated(user);
  }

  addToVaccination(user) {
    this.vaccination.vaccination_users.push(user);
    this.vr.registerToVaccination(this.vaccination, user.id).subscribe(res => {
      this.router.navigate(["../../login"], {
        relativeTo: this.route
      });
    });
  }


}
