import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <div class="container">
      <!-- Left Image Section -->
      <div class="image-container">
        <img src="https://cdn3d.iconscout.com/3d/premium/thumb/teacher-teaching-student-in-class-6586610-5507029.png" alt="Signup">
      </div>

      <!-- Right Form Section -->
      <div class="form-container">
        <div class="form-box">
          <h1>Create Account</h1>

          <form [formGroup]="signupForm" (ngSubmit)="register()">
            <!-- Name -->
            <div class="form-group">
              <label for="name">Full Name</label>
              <input id="name" type="text" formControlName="name" placeholder="Enter your name">
              <div *ngIf="signupForm.get('name')?.invalid && signupForm.get('name')?.touched" class="error-message">
                Name is required
              </div>
            </div>

            <!-- Email -->
            <div class="form-group">
              <label for="email">Email</label>
              <input id="email" type="email" formControlName="email" placeholder="Enter your email">
              <div *ngIf="signupForm.get('email')?.invalid && signupForm.get('email')?.touched" class="error-message">
                Please enter a valid email address
              </div>
            </div>

            <!-- Password -->
            <div class="form-group">
              <label for="password">Password</label>
              <input id="password" type="password" formControlName="password" placeholder="Create a password">
              <div *ngIf="signupForm.get('password')?.invalid && signupForm.get('password')?.touched" class="error-message">
                Password is required
              </div>
            </div>

            <!-- Role Selection -->
            <div class="form-group">
              <label for="role">Select Role</label>
              <select id="role" formControlName="role">
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>

            <!-- Signup Button -->
            <button type="submit" [disabled]="signupForm.invalid">Sign Up</button>

            <!-- Login Link -->
            <div class="login-link">
              <span>Already have an account?</span>
              <a href="/login">Log in</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }

    .container {
      display: flex;
      height: 100vh;
      width: 100vw;
      background-color: #f4f4f4;
    }

    .image-container {
      display: none;
      width: 50%;
      background: #4f46e5;
      justify-content: center;
      align-items: center;
      margin:30px
    }

    .image-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      margin:30px

    }

    .form-container {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .form-box {
      background: #fff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
      text-align: center;
    }

    h1 {
      margin-bottom: 20px;
      font-size: 24px;
      color: #333;
    }

    .form-group {
      text-align: left;
      margin-bottom: 15px;
    }

    label {
      font-size: 14px;
      font-weight: bold;
      color: #555;
    }

    input, select {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 14px;
      margin-top: 5px;
    }

    .error-message {
      color: red;
      font-size: 12px;
      margin-top: 5px;
    }

    button {
      width: 100%;
      padding: 12px;
      background: #4f46e5;
      border: none;
      color: white;
      font-size: 16px;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 10px;
    }

    button:disabled {
      background: #bbb;
      cursor: not-allowed;
    }

    .login-link {
      margin-top: 15px;
      font-size: 14px;
      color: #555;
    }

    .login-link a {
      color: #4f46e5;
      text-decoration: none;
      font-weight: bold;
    }

    .login-link a:hover {
      text-decoration: underline;
    }

    @media (min-width: 768px) {
      .image-container {
        display: flex;
      }

      .form-container {
        width: 50%;
      }
    }
  `]
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['student', Validators.required]
    });
  }

  register() {
    if (this.signupForm.valid) {
      console.log("Signup form is valid, sending request...", this.signupForm.value);

      this.authService.signup(this.signupForm.value).subscribe(response => {
        console.log("Signup success:", response);
        alert(response.message);
      }, error => {
        console.error("Signup failed:", error);
        alert(error.error.message);
      });
    } else {
      console.warn("Form is invalid");
      alert("Please fill all fields correctly.");
    }
  }
}
