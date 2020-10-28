import { Injectable } from '@angular/core';
import { Validator, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root'})
export class MatchPassword implements Validator {

    validate(formGroup: FormGroup) {
        const { password, passwordConf } = formGroup.value;

        if (password === passwordConf) {
            return null;
        } else {
            return { passwordsDontMatch: true };
        }
    }
}
