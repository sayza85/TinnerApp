import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"

export function PasswordMatchValidator(ctrl_password_name: string, ctrl_confirm_password_name: string): ValidatorFn {
    return function (formGroup: AbstractControl): ValidationErrors | null {
        const ctrlpassword = formGroup.get(ctrl_password_name)
        const ctrlconfirmpassword = formGroup.get(ctrl_confirm_password_name)
        if (ctrlpassword && ctrlconfirmpassword) {

            if (ctrlpassword.value !== ctrlconfirmpassword.value)
                ctrlconfirmpassword.setErrors({ misMatch: true })
            else
                ctrlconfirmpassword.setErrors(null)
        }
        return null


    }
} 