import { FormGroup, ValidationErrors } from '@angular/forms';

export class CustomValidators {
    static checkPasswords(passKey: string, passKeyConfirm: string): ValidationErrors | null {
        return (group: FormGroup) => {
            const passInput = group.controls[passKey];
            const passConfirmInput = group.controls[passKeyConfirm];
            if (passInput.value !== passConfirmInput.value) {
                return passConfirmInput.setErrors({ notEquivalent: true });
            } else {
                return passConfirmInput.setErrors(null);
            }
        };
    }
}
