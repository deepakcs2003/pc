import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';  
  userpassword: string = '';
  role: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (!this.email || !this.userpassword ) {
      alert('Please fill in all fields.');
      return;
    }

    this.authService.login(this.email, this.userpassword).subscribe(
      (user) => {
        if (user) {
          alert('Login successful!'); 
          // Redirect based on role
          if (user.role === 'student') {
            this.router.navigate(['/api/students']);
          } else if (user.role === 'instructor') {
            this.router.navigate(['/api/instructors']
            );
          } else if (user.role === 'admin') {
            this.router.navigate(['/api/departments']);
          }
        } else {
          alert('Invalid email or password');
        }
      },
      (error) => {
        alert('Login failed. Please check your credentials.');
      }
    );
  }
}
