import {Form, FormControl} from "@angular/forms";
import { formatDate } from "@angular/common";
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {VaccinationRegistrationService} from "./vaccination-registration.service";

export class VaccinationValidators {

  static vaccNrExists(vr : VaccinationRegistrationService) {
    return function(control: FormControl): Observable<{[error: string]: any}> {
      return vr.check(control.value)
        .pipe(map(exists => !exists ? null : {vaccNrExists: {valid: false }}));
    }
  }

  static dateValidator(control: FormControl): {[error: string]: any} {
    const today = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    return control.value > today ? null : {dateValidator: {valid: false}};
  }

}
