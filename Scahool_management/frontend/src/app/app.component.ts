// app.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { appRoutes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  pageTitle = 'Dashboard';
  showAddButton = false;
  isSidebarOpen = true;
  userMenuOpen = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Update page title on route change
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updatePageContext();
    });
    
    // Initial page context
    this.updatePageContext();
  }

  updatePageContext() {
    const url = this.router.url;
    
    if (url.includes('/students')) {
      this.pageTitle = 'Student Management';
      this.showAddButton = true;
    } else if (url.includes('/instructors')) {
      this.pageTitle = 'Instructor Management';
      this.showAddButton = true;
    } else if (url.includes('/courses')) {
      this.pageTitle = 'Course Management';
      this.showAddButton = true;
    } else if (url.includes('/departments')) {
      this.pageTitle = 'Department Management';
      this.showAddButton = true;
    } else if (url.includes('/login')) {
      this.pageTitle = 'Login';
      this.showAddButton = false;
    } else if (url.includes('/signup')) {
      this.pageTitle = 'Sign Up';
      this.showAddButton = false;
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
  }

  logout() {
    // Clear authentication data
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Navigate to login
    this.router.navigate(['/login']);
  }

  navigateToStudents() {
    this.router.navigate(['/students']);
  }

  navigateToInstructors() {
    this.router.navigate(['/instructors']);
  }

  navigateToCourses() {
    this.router.navigate(['/courses']);
  }

  navigateToDepartments() {
    this.router.navigate(['/departments']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  
  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  onAddNew() {
    const url = this.router.url;
    
    if (url.includes('/students')) {
      this.router.navigate(['/students/new']);
    } else if (url.includes('/instructors')) {
      this.router.navigate(['/instructors/new']);
    } else if (url.includes('/courses')) {
      this.router.navigate(['/courses/new']);
    } else if (url.includes('/departments')) {
      this.router.navigate(['/departments/new']);
    }
  }
}