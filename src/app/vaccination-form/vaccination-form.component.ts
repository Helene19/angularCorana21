import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { VaccinationFactory } from "../shared/vaccination-factory";
import { VaccinationRegistrationService } from "../shared/vaccination-registration.service";
import { Vaccination, VaccinationPlace } from "../shared/vaccination";
import { VaccinationFormErrorMessages } from "./vaccination-form-error-messages";
import { VaccinationValidators } from "../shared/vaccination-validators";

@Component({
  selector: 'bs-vaccination-form',
  templateUrl: './vaccination-form.component.html',
  styleUrls: ['./vaccination-form.component.css']
})

export class VaccinationFormComponent implements OnInit {

  vaccinationForm: FormGroup;
  vaccination = VaccinationFactory.empty();
  vaccinationPlaces: VaccinationPlace[];
  errors: { [key: string]: string } = {};
  isUpdatingVaccination = false;
  showSummary = false;

  constructor(
    private fb: FormBuilder,
    private vr: VaccinationRegistrationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const vaccNr = this.route.snapshot.params["vaccination_nr"];

    if (vaccNr) {
      this.isUpdatingVaccination = true;
      this.vr.getSingle(vaccNr).subscribe(vaccination => {
        this.vaccination = vaccination;
        this.initVaccination();
      });
    }
    this.initVaccination();
  }

  initVaccination() {
    this.vaccinationForm = this.fb.group({
      id: this.vaccination.id,
      vaccination_nr: [this.vaccination.vaccination_nr, [Validators.required],
        this.isUpdatingVaccination ? null : VaccinationValidators.vaccNrExists(this.vr)],
      date: [this.vaccination.date, [Validators.required, VaccinationValidators.dateValidator]],
      starttime: [this.vaccination.starttime, [Validators.required,
        Validators.pattern("^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$")]],
      endtime: [this.vaccination.endtime, [Validators.required,
        Validators.pattern("^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$")]],
      max_participants: [this.vaccination.max_participants, [Validators.required, Validators.max(25), Validators.min(2)]],
      vaccination_type: [this.vaccination.vaccination_type, Validators.required],
      vaccination_place: [this.vaccination.vaccination_place.vaccination_place_nr, Validators.required]
    });

    this.vaccinationForm.statusChanges.subscribe(() =>
      this.updateErrorMessages());
    this.vr.getAllPlaces().subscribe(res => this.vaccinationPlaces = res);
  }

  nextStep() {
    this.showSummary = true;
  }

  backToPage() {
    if(this.isUpdatingVaccination) {
      this.router.navigateByUrl("/vaccinations/"+this.vaccination.vaccination_nr);
    } else {
      this.router.navigateByUrl("/vaccinations");
    }
  }

  updateErrorMessages() {

    this.errors = {};

    for (const message of VaccinationFormErrorMessages) {
      const control = this.vaccinationForm.get(message.forControl);

      if (
        control &&
        control.dirty &&
        control.invalid &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  back() {
    this.vaccination.vaccination_place.vaccination_place_nr = this.vaccinationForm.value.vaccination_place;
    this.showSummary = false;
  }

  submitVaccination() {
    const vaccination: Vaccination = VaccinationFactory.fromObject(this.vaccinationForm.value);
    vaccination.vaccination_place = this.vaccinationForm.value.vaccination_place;
    vaccination.vaccination_users = this.vaccination.vaccination_users;

    if (this.isUpdatingVaccination) {
      this.vr.update(vaccination).subscribe(res => {
        this.router.navigate(["../../vaccinations", vaccination.vaccination_nr], {
          relativeTo: this.route
        });
      });

    } else {

      this.vr.create(vaccination).subscribe(res => {
        this.vaccination = VaccinationFactory.empty();
        this.vaccinationForm.reset(VaccinationFactory.empty());
        this.router.navigate(["../vaccinations"], { relativeTo: this.route
        });
      });
    }
  }

}
