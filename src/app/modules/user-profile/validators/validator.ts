import { AbstractControl } from "@angular/forms";

export function passwordValidator(control:AbstractControl):any |null{
    let newPassword = control.get('newPassword')
    let confirmPassword = control.get('confirmNewPassword')
    if(newPassword?.pristine || confirmPassword?.pristine){
        return null;
    }
    if (newPassword?.value !== confirmPassword?.value) {
        confirmPassword?.setErrors({ mismatch: true });
      } else {
        confirmPassword?.setErrors(null);
      }
}