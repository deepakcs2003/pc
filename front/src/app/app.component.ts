import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service'; // Add this import
import { Router } from '@angular/router'; // Add this import

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'deepak';
  
  // Add constructor to inject AuthService and Router
  constructor(
    public authService: AuthService, // Note 'public' access modifier so it's accessible in the template
    private router: Router
  ) {}
  
  // Add logout method
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}