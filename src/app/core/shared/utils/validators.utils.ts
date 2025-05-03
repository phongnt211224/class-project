import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function compareDate(
  field1: string,
  field2: string,
  errorName: string
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const f1 = group.get(field1)?.value;
    const f2 = group.get(field2)?.value;

    if (!f1 || !f2) return null;

    // If using dayjs from nz-date-picker
    const date1 = f1.toDate ? f1.toDate() : new Date(f1);
    const date2 = f2.toDate ? f2.toDate() : new Date(f2);
    if (isNaN(date1.getTime()) || isNaN(date2.getTime())) return null;

    // Compare only year/month/day by stripping time
    const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

    return d1 >= d2 ? {[errorName]: true} : null;
  };
}

export function compareWithToday(
  fieldName: string,
  errorName: string
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const controlValue = group.get(fieldName)?.value;

    if (!controlValue) return null;

    const inputDate = controlValue.toDate ? controlValue.toDate() : new Date(controlValue);
    if (isNaN(inputDate.getTime())) return null;

    const today = new Date();
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const valueDate = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
    if (valueDate >= todayDate) {
      return {[errorName]: true};
    }

    return null;
  };
}


