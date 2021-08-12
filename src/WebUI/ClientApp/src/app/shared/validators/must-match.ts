export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup) => {

    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }


    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({
        mustMatch: {
          message: 'The password and confirmation password are not the same.'
        },
      });
      return;
    }

    matchingControl.setErrors(null);
  };
}
