import { Component, OnInit, Input } from '@angular/core';
import { Vaccination, VaccinationPlace, User } from "../shared/vaccination";

@Component({
  selector: 'a.bs-vaccination-list-item',
  templateUrl: './vaccination-list-item.component.html',
  styles: [
  ]
})
export class VaccinationListItemComponent implements OnInit {

  @Input() vacc: Vaccination;

  constructor() { }

  ngOnInit(): void {
  }

}
