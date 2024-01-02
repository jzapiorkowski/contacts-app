import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'formError',
})
export class FormErrorPipe implements PipeTransform {
  public transform(errors: ValidationErrors | null): string {
    if (!errors) return '';

    if (errors['required']) {
      return 'This field is required.';
    } else if (errors['minlength']) {
      return `Minimum length is ${errors['minlength'].requiredLength}.`;
    } else if (errors['maxlength']) {
      return `Maximum length is ${errors['maxlength'].requiredLength}.`;
    }

    return 'Invalid value.';
  }
}
