import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  userpassword: string = '';
  role: string = '';

  private apiUrl = 'http://localhost:3000/api/signup'; // Update with your backend URL

  constructor(private router: Router, private http: HttpClient) {} 

  onSignup() {
    if (!this.username || !this.email || !this.userpassword || !this.role) {
      alert('Please fill in all fields.');
      return;
    }

    const userData = {
      username: this.username,
      email: this.email,
      userpassword: this.userpassword,
      role: this.role
    };

    this.http.post(this.apiUrl, userData).subscribe(
      (response) => {
        console.log('User signed up successfully:', response);
        alert('Signup successful! Please log in.');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Signup failed:', error);
        alert('Signup failed. Please try again.');
      }
    );
  }
}
