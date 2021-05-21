import { Component, OnInit, Input } from '@angular/core';
import { Vaccination } from "../shared/vaccination";

@Component({
  selector: 'a.bs-vaccination-list-item',
  templateUrl: './vaccination-list-item.component.html',
  styleUrls: ['./vaccination-list-item.component.css']
})

export class VaccinationListItemComponent implements OnInit {

  @Input() vacc: Vaccination;

  constructor() { }

  ngOnInit(): void {
  }

  freePlaces() {
    return this.vacc.max_participants - this.vacc.vaccination_users.length;
  }

  checkFreePlaces() {
    if(this.vacc.max_participants == this.vacc.vaccination_users.length) {
      return false;
    } else {
      return true;
    }
  }

}
