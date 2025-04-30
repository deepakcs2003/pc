import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { Course } from '../../../models/course.model';
import { Grade } from '../../../models/grade.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule], // Add these imports
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  courses: Course[] = [];
  grades: Grade[] = [];
  studentName: string = '';
  isLoading: boolean = true;
  error: string | null = null;
  
  constructor(
    private studentService: StudentService,
    private authService: AuthService
  ) { }
  
  ngOnInit(): void {
    this.loadStudentData();
    const user = this.authService.getCurrentUser();
    if (user) {
      this.studentName = user.username;
    }
  }
  
  loadStudentData(): void {
    this.isLoading = true;
    this.error = null;
    
    Promise.all([
      this.loadCourses(),
      this.loadGrades()
    ]).finally(() => {
      this.isLoading = false;
    });
  }
  
  loadCourses(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.studentService.getCourses().subscribe({
        next: (courses) => {
          this.courses = courses;
          resolve();
        },
        error: (err) => {
          this.error = 'Failed to load courses. Please try again later.';
          reject(err);
        }
      });
    });
  }
  
  loadGrades(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.studentService.getGrades().subscribe({
        next: (grades) => {
          this.grades = grades;
          resolve();
        },
        error: (err) => {
          this.error = 'Failed to load grades. Please try again later.';
          reject(err);
        }
      });
    });
  }
  
  getGrade(courseId: number): number | null {
    const grade = this.grades.find(g => g.courseId === courseId);
    return grade ? grade.score : null;
  }

  calculateGPA(): number {
    if (this.grades.length === 0) return 0;
    
    const totalPoints = this.grades.reduce((sum, grade) => sum + grade.score, 0);
    return parseFloat((totalPoints / this.grades.length).toFixed(2));
  }

  getCourseById(courseId: number): Course | undefined {
    return this.courses.find(course => course.id === courseId);
  }

  getEnrolledCoursesCount(): number {
    return this.courses.length;
  }

  hasPassingGrade(courseId: number): boolean {
    const grade = this.getGrade(courseId);
    return grade !== null && grade >= 60;
  }

  getCompletedCoursesCount(): number {
    return this.grades.filter(grade => grade.score >= 60).length;
  }
  
  getGradeClass(grade: number | null): string {
    if (grade === null) return 'text-secondary';
    if (grade >= 90) return 'text-success';
    if (grade >= 80) return 'text-primary';
    if (grade >= 70) return 'text-info';
    if (grade >= 60) return 'text-warning';
    return 'text-danger';
  }
  
  getGradeLetter(grade: number | null): string {
    if (grade === null) return 'N/A';
    if (grade >= 90) return 'A';
    if (grade >= 80) return 'B';
    if (grade >= 70) return 'C';
    if (grade >= 60) return 'D';
    return 'F';
  }
  
  refreshDashboard(): void {
    this.loadStudentData();
  }
}