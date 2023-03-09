import { FormControl, ValidationErrors } from "@angular/forms";

export class Luv2ShopValidators {
  // personal validation

  //blank or empty space
  static notOnlyWhiteSpace(control: FormControl): ValidationErrors {
    // check
    if ((control.value != null) && (control.value.trim().length === 0)) {

      return { 'notOnlyWhiteSpace': true };
    } else {
      //valid, return null
      return null as any;
    }
  }

}
