import { AbstractControl, ValidatorFn } from "@angular/forms";

export function timeFormated(): ValidatorFn {
  return (control: AbstractControl) => {
    const value = <string>control.value;
    if (!value) return;
    if (value.length === 0) return;
    const pattern: RegExp = /^[0-9]{2,5}:[0-9]{2}:[0-9]{2}$/;

    if (!value.match(pattern)) {
      return {
        timeFormated: {
          message: 'Time must be formated "00:00:00"'
        }
      }
    }

    return;
  }
}
