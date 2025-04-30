import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/login'; 
  private currentUser: any = null;

  constructor(private http: HttpClient) {}

  login(email: string, userpassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { email, userpassword }).pipe(
      tap(user => {
        if (user) {
          this.currentUser = user;
          localStorage.setItem('user', JSON.stringify(user)); // Store user info
        }
      })
    );
  }

  getCurrentUser(): any {
    if (!this.currentUser) {
      this.currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    }
    return this.currentUser;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('user');
  }
}
