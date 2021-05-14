import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { VaccinationListComponent } from './vaccination-list/vaccination-list.component';
import { VaccinationRegistrationService } from "./shared/vaccination-registration.service";
import { HttpClientModule } from "@angular/common/http";
import { VaccinationListItemComponent } from './vaccination-list-item/vaccination-list-item.component';
import { VaccinationDetailsComponent } from './vaccination-details/vaccination-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from "./app-routing.module";
import { VaccinationFormComponent } from './vaccination-form/vaccination-form.component';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    VaccinationListComponent,
    VaccinationListItemComponent,
    VaccinationDetailsComponent,
    HomeComponent,
    VaccinationFormComponent

  ],
  imports: [
    BrowserModule, HttpClientModule, NgbModule, AppRoutingModule, ReactiveFormsModule
  ],
  providers: [VaccinationRegistrationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
