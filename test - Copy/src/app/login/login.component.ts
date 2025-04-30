import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object  // Inject PLATFORM_ID to check platform
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    if (isPlatformBrowser(this.platformId)) {
      // Client-side code
      console.log('Running in the browser!');
      // Example of document usage that will only run on the browser
      document.title = 'Login Page';
    }
  }
  
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          console.log('Login successful', response);
  
          // Assuming the response has a `role` and `token` (or other identifying info)
          if (response?.role === 'teacher') {
            this.router.navigate(['teacher-dashboard']);
          } else if (response?.role === 'student') {
            this.router.navigate(['student-dashboard']);
          } else {
            // If the role doesn't match, handle this case
            console.error('Invalid role', response);
            alert('Login failed: Invalid role');
          }
        },
        (error) => {
          console.error('Login failed', error);
          alert('Login failed: ' + (error?.message || 'Unknown error'));
        }
      );
    } else {
      alert('Please fill out the form correctly');
    }
  }
}