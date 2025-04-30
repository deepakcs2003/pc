// services/student.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course } from '../models/course.model';
import { Grade } from '../models/grade.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  // Mock data
  private mockCourses: Course[] = [
    { id: 1, title: 'Introduction to Mathematics', description: 'Basic principles of mathematics', teacherId: 1, teacherName: 'John Smith' },
    { id: 2, title: 'Advanced Physics', description: 'Complex physics concepts and theories', teacherId: 2, teacherName: 'Emily Johnson' },
    { id: 3, title: 'Computer Science Fundamentals', description: 'Basic concepts in computer science', teacherId: 1, teacherName: 'John Smith' }
  ];

  private mockGrades: Grade[] = [
    { id: 1, studentId: 1, courseId: 1, score: 85, studentName: 'Alice Cooper', courseName: 'Introduction to Mathematics' },
    { id: 2, studentId: 1, courseId: 2, score: 78, studentName: 'Alice Cooper', courseName: 'Advanced Physics' },
    { id: 3, studentId: 1, courseId: 3, score: 92, studentName: 'Alice Cooper', courseName: 'Computer Science Fundamentals' }
  ];
  
  constructor() { }
  
  // Get enrolled courses
  getCourses(): Observable<Course[]> {
    return of(this.mockCourses);
  }
  
  // Get course details
  getCourse(id: number): Observable<Course> {
    const course = this.mockCourses.find(c => c.id === id);
    return of(course || { id: 0, title: '', description: '', teacherId: 0 });
  }
  
  // Get all grades
  getGrades(): Observable<Grade[]> {
    return of(this.mockGrades);
  }
  
  // Get grades for a specific course
  getGradesByCourse(courseId: number): Observable<Grade[]> {
    const grades = this.mockGrades.filter(g => g.courseId === courseId);
    return of(grades);
  }
}