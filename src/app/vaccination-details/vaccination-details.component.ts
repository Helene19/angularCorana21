import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Vaccination, VaccinationPlace, User } from "../shared/vaccination";
import { VaccinationRegistrationService } from "../shared/vaccination-registration.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication.service";

@Component({
  selector: 'bs-vaccination-details',
  templateUrl: './vaccination-details.component.html',
  styles: [
  ]
})
export class VaccinationDetailsComponent implements OnInit {

  vaccination: Vaccination;

  constructor(
    private vr: VaccinationRegistrationService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.vr.getSingle(params['vaccination_nr']).subscribe(v => this.vaccination = v);
  }

  removeBook() {
    if (confirm('Impftermin wirklich löschen?')) {
      this.vr.remove(this.vaccination.vaccination_nr)
        .subscribe(res => this.router.navigate(['../'], { relativeTo:
          this.route }));
    }
  }


}
