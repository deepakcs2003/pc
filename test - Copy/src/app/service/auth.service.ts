import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Signup - now requires a 'role' field (student or teacher)
  signup(data: { name: string, email: string, password: string, role: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  // Login - stores user ID, role, and email in localStorage
  login(data: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data).pipe(
      tap((response: any) => {
        if (response?.id) {
          localStorage.setItem('userId', response.id.toString());
        }
        if (response?.role) {
          localStorage.setItem('userRole', response.role);
        }
        if (response?.email) {
          localStorage.setItem('userEmail', response.email);
        }
      })
    );
  }

  // Create Test (teacher only)
  createTest(testData: { title: string, questions: any[] }): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-test`, testData);
  }

  // Get list of tests that are available (title + options)
  getAvailableTests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/available-tests`);
  }

  // Student submits answers (currently only handles one selected_option per call)
  submitTest(data: { student_id: number, test_id: number, selected_option: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/give-test`, data);
  }

  // View student's score/result
  getTestResults(studentId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/score/${studentId}`);
  }

  // View how many tests a student has taken
  getDashboardStats(studentId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/dashboard/${studentId}`);
  }

  // View list of students who gave a specific test (teacher feature)
  getTestStudents(testId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/test-students/${testId}`);
  }
}
