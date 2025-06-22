import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const PROFANE_WORDS = ['damn', 'hell', 'shit', 'fuck', 'asshole'];

export function profanityValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const valueLower = control.value.toLowerCase();

    const hasProfanity = PROFANE_WORDS.some((word) =>
      valueLower.includes(word)
    );

    return hasProfanity ? { profanity: true } : null;
  };
}
