import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { VaccinationListComponent } from './vaccination-list/vaccination-list.component';
import {VaccinationRegistrationService} from "./shared/vaccination-registration.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    VaccinationListComponent
  ],
  imports: [
    BrowserModule, HttpClientModule
  ],
  providers: [VaccinationRegistrationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
