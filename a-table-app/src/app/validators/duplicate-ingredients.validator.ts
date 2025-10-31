import { AbstractControl, ValidationErrors, ValidatorFn, FormArray, FormGroup } from '@angular/forms';

export const duplicateIngredientsValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent || !(control.parent.parent instanceof FormArray)) {
        return null;
    }

    const formArray = control.parent.parent as FormArray;
    const names = formArray.controls
        .map(c => (c as FormGroup).get('name')?.value?.trim())
        .filter(name => !!name);

    const currentName = control.value?.trim();
    const duplicates = names.filter(name => name === currentName);

    return duplicates.length > 1 ? { duplicate: true } : null;
};
