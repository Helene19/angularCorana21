import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Vaccination, VaccinationPlace, User } from "../shared/vaccination";
import { VaccinationRegistrationService } from "../shared/vaccination-registration.service";

@Component({
  selector: 'bs-vaccination-list',
  templateUrl: './vaccination-list.component.html',
  styles: [
  ]
})
export class VaccinationListComponent implements OnInit {

  vaccinations: Vaccination[];

  @Output() showDetailsEvent = new EventEmitter<Vaccination>();

  constructor(private vr: VaccinationRegistrationService) { }

  ngOnInit(): void {
    this.vr.getAll().subscribe(res => this.vaccinations = res);
  }

  showDetails(vaccination: Vaccination) {
    this.showDetailsEvent.emit(vaccination);
  }

}
