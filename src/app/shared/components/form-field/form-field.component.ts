import { Component, Input, ContentChild, AfterContentInit, HostBinding } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { FormControlName, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [NgIf, NgClass, ReactiveFormsModule],
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements AfterContentInit {
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() hint: string = '';
  @Input() errorMessages: { [key: string]: string } = {};
  @Input() fullWidth: boolean = true;
  @Input() labelPosition: 'top' | 'side' = 'top';

  @HostBinding('class.form-field-invalid')
  get isInvalid(): null | false | boolean {
    return this.control && this.control.invalid && (this.control.dirty || this.control.touched);
  }

  @HostBinding('class.form-field-valid')
  get isValid(): null | false | boolean {
    return this.control && this.control.valid && (this.control.dirty || this.control.touched);
  }

  @HostBinding('class.form-field-disabled')
  get isDisabled(): null | boolean {
    return this.control && this.control.disabled;
  }

  @HostBinding('class.w-full')
  get isFullWidth(): boolean {
    return this.fullWidth;
  }

  @HostBinding('class.flex')
  get isFlexContainer(): boolean {
    return true;
  }

  @HostBinding('class.flex-col')
  get isFlexColumn(): boolean {
    return this.labelPosition === 'top';
  }

  @HostBinding('class.items-start')
  get isAlignStart(): boolean {
    return this.labelPosition === 'top';
  }

  @HostBinding('class.items-center')
  get isAlignCenter(): boolean {
    return this.labelPosition === 'side';
  }

  @ContentChild(NgControl) control: NgControl | null = null;

  ngAfterContentInit() {
    if (!this.control) {
      console.warn('A form control is required for the form-field component to work properly.');
    }
  }

  /**
   * Get the error message for the current error
   */
  getErrorMessage(): string {
    if (!this.control || !this.control.errors) return '';

    const errors = this.control.errors;
    const errorKeys = Object.keys(errors);

    if (errorKeys.length === 0) return '';

    const firstError = errorKeys[0];

    // Use custom error message if available
    if (this.errorMessages && this.errorMessages[firstError]) {
      return this.errorMessages[firstError];
    }

    // Default error messages
    switch (firstError) {
      case 'required':
        return 'Este campo é obrigatório';
      case 'email':
        return 'Por favor, insira um e-mail válido';
      case 'minlength':
        return `Mínimo de ${errors['minlength'].requiredLength} caracteres`;
      case 'maxlength':
        return `Máximo de ${errors['maxlength'].requiredLength} caracteres`;
      case 'pattern':
        return 'Formato inválido';
      case 'min':
        return `Valor mínimo: ${errors['min'].min}`;
      case 'max':
        return `Valor máximo: ${errors['max'].max}`;
      default:
        return 'Campo inválido';
    }
  }
}
