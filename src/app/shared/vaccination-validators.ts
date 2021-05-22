import { FormControl } from "@angular/forms";
import { formatDate } from "@angular/common";

export class VaccinationValidators {

  static dateValidator(control: FormControl): {[error: string]: any} {
    let today = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    console.log("Look: "+control.value);
    console.log("Yeah: "+today);

    return control.value > today ? null : {dateValidator: {valid: false}};
  }

}
