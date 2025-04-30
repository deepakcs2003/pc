import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NgIf],
  template: `
    <nav>
      <div class="nav-left">
        <span *ngIf="isLoggedIn" class="user-info">
          Welcome, {{ userName }} ({{ userRole }})
        </span>
      </div>
      <div class="nav-right">
        <a *ngIf="!isLoggedIn" routerLink="/login">Login</a>
        <a *ngIf="!isLoggedIn" routerLink="/signup">Signup</a>
        <a *ngIf="isLoggedIn" (click)="logout()" style="cursor: pointer;">Logout</a>
        <a routerLink="/about">About</a>
        <a routerLink="/contact">Contact</a>
      </div>
    </nav>

    <router-outlet></router-outlet> 
  `,
  styles: [`
    nav { 
      padding: 12px 20px;
      background: #ffffff;
      border-bottom: 3px solid #ff6b6b;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .nav-right {
      display: flex;
      justify-content: flex-end;
    }
    .user-info {
      font-weight: 500;
      color: #333;
      font-size: 14px;
    }
    a { 
      margin-left: 25px;
      text-decoration: none;
      font-weight: 500;
      color: #333;
      position: relative;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 14px;
    }
    a:after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -5px;
      left: 0;
      background-color: #ff6b6b;
      transition: width 0.3s ease;
    }
    a:hover:after {
      width: 100%;
    }
    a:hover {
      color: #ff6b6b;
    }
  `]
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  userName: string = '';
  userEmail: string = '';
  userRole: string = '';
  
  constructor(private router: Router) {}
  
  ngOnInit() {
    this.checkLoginStatus();
  }
  
  checkLoginStatus() {
    // Check if user data exists in localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      this.isLoggedIn = true;
      this.userName = localStorage.getItem('name') || '';
      this.userEmail = localStorage.getItem('email') || '';
      this.userRole = localStorage.getItem('role') || '';
    } else {
      this.isLoggedIn = false;
    }
  }
  
  logout() {
    // Clear all items from localStorage
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
    // Reset component properties
    this.isLoggedIn = false;
    this.userName = '';
    this.userEmail = '';
    this.userRole = '';
    
    // Navigate to login page
    this.router.navigate(['/login']);
  }
}