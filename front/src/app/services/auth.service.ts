// services/auth.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

export interface SignupData {
  username: string;
  password: string;
  name: string;
  email: string;
  role?: 'admin' | 'teacher' | 'student';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Mock users for testing
  private mockUsers = [
    { id: 1, username: 'admin', password: 'admin123', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
    { id: 2, username: 'teacher', password: 'teacher123', name: 'Teacher User', email: 'teacher@example.com', role: 'teacher' },
    { id: 3, username: 'student', password: 'student123', name: 'Student User', email: 'student@example.com', role: 'student' }
  ];
  
  constructor() { }
  
  signup(userData: SignupData): Observable<any> {
    // Check if username already exists
    console.log('Mock signup called with data:', userData);
    const existingUser = this.mockUsers.find(u => u.username === userData.username);
    
    if (existingUser) {
      return new Observable(observer => {
        observer.error({ error: { message: 'Username already exists' } });
      });
    }
    
    // In a real app, you'd make an API call here
    // For this mock service, we'll just add to the array
    
    // Generate a new ID (would be handled by backend in real app)
    const newId = Math.max(...this.mockUsers.map(u => u.id)) + 1;
    
    // Create new user with default role as student if not specified
    const newUser = {
      id: newId,
      username: userData.username,
      password: userData.password, // In real app, this would be hashed by backend
      name: userData.name,
      email: userData.email,
      role: userData.role || 'student'
    };
    
    // Add to mock database
    this.mockUsers.push(newUser);
    
    // Create response object (similar to login)
    const response = {
      token: 'mock-jwt-token-' + newUser.role,
      user: {
        id: newUser.id,
        username: newUser.username,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    };
    
    // Store in localStorage
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    return of(response);
  }
  
  login(username: string, password: string): Observable<any> {
    // Find user in mock data
    const user = this.mockUsers.find(u => 
      u.username === username && u.password === password
    );
    
    if (user) {
      // Create mock response
      const response = {
        token: 'mock-jwt-token-' + user.role,
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email,
          role: user.role
        }
      };
      
      // Store in localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      return of(response);
    } else {
      // Return error observable
      return new Observable(observer => {
        observer.error({ error: { message: 'Invalid credentials' } });
      });
    }
  }
  
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  
  getCurrentUserRole(): string | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }
}