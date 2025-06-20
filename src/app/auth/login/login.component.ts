import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { AuthService } from '../auth.service';
import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf,
    FormFieldComponent,
    ButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  returnUrl: string = '/dashboard';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Initialize login form
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });

    // Get return url from route parameters or default to '/dashboard'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

    // Redirect to home if already logged in
    if (this.authService.isAuthenticated) {
      this.router.navigate([this.returnUrl]);
    }
  }

  /**
   * Convenience getter for easy access to form fields
   */
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.f['email'].value, this.f['password'].value)
      .subscribe({
        next: () => {
          // Navigate to return url
          this.router.navigate([this.returnUrl]);
        },
        error: error => {
          this.error = 'Email ou senha inválidos';
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
  }

  /**
   * Reset the form
   */
  resetForm(): void {
    this.submitted = false;
    this.loginForm.reset();
  }
}
