import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage = '';
  passwordMismatch = false;
  loading = false;
  submitted = false; // <-- Add this line

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submitted = true; // <-- Also set it here

    if (this.signupForm.invalid) return;

    const { name, username, email, password, confirmPassword } = this.signupForm.value;
    if (password !== confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    this.loading = true;
    this.authService.signup({ name, username, email, password }).subscribe({
      next: () => this.router.navigate(['/admin']),
      error: (err) => {
        this.errorMessage = err.error?.message || 'Signup failed';
        this.loading = false;
      }
    });
  }
}
