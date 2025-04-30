import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.signupForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      role: ['']
    });

    if (isPlatformBrowser(this.platformId)) {
      document.title = 'Signup Page';
    }
  }

  onSubmit(): void {
    this.authService.signup(this.signupForm.value).subscribe(
      (response) => {
        console.log('Signup successful', response);
        this.router.navigate(['login']);
      },
      (error) => {
        console.error('Signup failed', error);
      }
    );
  }
}
