import { FormControl } from "@angular/forms";
import { formatDate } from "@angular/common";

export class VaccinationValidators {

  static dateValidator(control: FormControl): {[error: string]: any} {
    const today = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    return control.value > today ? null : {dateValidator: {valid: false}};
  }

}
