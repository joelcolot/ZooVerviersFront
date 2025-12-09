import { Form, FormGroup, ValidatorFn } from "@angular/forms";

interface samePassword
{
    notMatching?: boolean;
}

export function PasswordMatch(form: FormGroup): ValidatorFn
{
    return (control) => 
    {
        const password=form.get("password")?.value;
        const confirmPassword=form.get("confirmPassword")?.value;
        const resultat: samePassword = {};
        if (confirmPassword!==password)
        {
            resultat.notMatching=true;
            return resultat;
        }
        return null;
    }
}