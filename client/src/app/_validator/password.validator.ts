import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"

export const PasswordValidator = function (minLenght: number, maxLenght: number): ValidatorFn {
    return function (control: AbstractControl): ValidationErrors | null {
        const password = control.value as string
        if (!password) return { required: true }
        else if (password.length < minLenght)return { invalidminLenght: true }
        else if (password.length > maxLenght) return { invalidMaxLenght: true }
        else if (!/[a-z]/.test(password)) return { invalidLowerCase: true }
        else if (!/[A-Z]/.test(password)) return { invalidUpperCase: true }
        else if (!/[0-9]/.test(password)) return { invalidNumber: true }
        else if (!/[!^@#$%&*().<>{}|;:"']/.test(password)) return { invalidSpecialChar: true }
        return null
    }
}
