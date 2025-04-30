import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <div class="login-container">
      <div class="image-container">
        <img src="https://img.freepik.com/premium-photo/student-3d-character-collection-dynamic_461200-800.jpg" alt="Login" class="login-image">
      </div>
      <div class="form-container">
        <form [formGroup]="loginForm" (ngSubmit)="login()">
          <h1>Welcome Back</h1>
          <p class="subtitle">Please enter your credentials to continue</p>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" type="email" placeholder="Enter your email" formControlName="email">
            <div *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched" class="error-message">
              Please enter a valid email address
            </div>
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter your password" formControlName="password">
            <div *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched" class="error-message">
              Password is required
            </div>
          </div>
          
          <div class="forgot-password">
            <a href="#">Forgot password?</a>
          </div>
          
          <button type="submit" [disabled]="loginForm.invalid">Login</button>
          
          <div class="signup-link">
            Don't have an account? <a href="/signup">Sign up</a>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      height: 100vh;
      width: 100vw;
      background-color: #f5f5f5;
    }
    
    .image-container {
      flex: 1;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    
    .login-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .form-container {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    
    form {
      width: 100%;
      max-width: 450px;
      background: white;
      padding: 3rem;
      border-radius: 12px;
      box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);
    }
    
    h1 {
      margin: 0;
      font-size: 2rem;
      color: #333;
      margin-bottom: 0.5rem;
    }
    
    .subtitle {
      color: #666;
      margin-bottom: 2rem;
    }
    
    .form-group {
      margin-bottom: 1.5rem;
    }
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #555;
    }
    
    input {
      width: 100%;
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }
    
    input:focus {
      outline: none;
      border-color: #4f46e5;
    }
    
    .error-message {
      color: #e74c3c;
      font-size: 0.85rem;
      margin-top: 0.5rem;
    }
    
    .forgot-password {
      text-align: right;
      margin-bottom: 1.5rem;
    }
    
    .forgot-password a {
      color: #4f46e5;
      text-decoration: none;
      font-size: 0.9rem;
    }
    
    button {
      width: 100%;
      padding: 1rem;
      background: #4f46e5;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    button:hover {
      background: #4338ca;
    }
    
    button:disabled {
      background: #a5a5a5;
      cursor: not-allowed;
    }
    
    .signup-link {
      text-align: center;
      margin-top: 2rem;
      color: #555;
    }
    
    .signup-link a {
      color: #4f46e5;
      text-decoration: none;
      font-weight: 500;
    }
    
    /* Make it responsive */
    @media (max-width: 768px) {
      .login-container {
        flex-direction: column;
      }
      
      .image-container {
        display: none;
      }
      
      .form-container {
        width: 100%;
      }
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(response => {
        localStorage.setItem('name', response.name);  
        localStorage.setItem('email', response.email); 
        localStorage.setItem('token', response.token); 
        localStorage.setItem('role', response.role);  
  
        // Redirect based on role
        if (response.role === 'teacher') {
          this.router.navigate(['/dashboard']);
        } else if (response.role === 'student') {
          this.router.navigate(['/test']);
        }
      }, error => {
        alert(error.error.message);
      });
    } else {
      alert("Please enter valid email and password.");
    }
  }
}