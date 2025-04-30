// components/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule], // Added ReactiveFormsModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    // Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      this.redirectBasedOnRole();
    }
  }
  
  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    
    this.loading = true;
    this.errorMessage = '';
    
    const { username, password } = this.loginForm.value;
    
    this.authService.login(username, password)
      .subscribe({
        next: () => {
          this.redirectBasedOnRole();
        },
        error: (error) => {
          this.errorMessage = 'Invalid username or password';
          this.loading = false;
        }
      });
  }
  
  private redirectBasedOnRole(): void {
    const role = this.authService.getCurrentUserRole();
    
    if (role === 'admin') {
      this.router.navigate(['/admin']);
    } else if (role === 'teacher') {
      this.router.navigate(['/teacher']);
    } else if (role === 'student') {
      this.router.navigate(['/student']);
    } else {
      // Default fallback
      this.router.navigate(['/login']);
    }
  }
}