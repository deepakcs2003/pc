// services/teacher.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course } from '../models/course.model';
import { Student } from '../models/student.model';
import { Grade } from '../models/grade.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private courses: Course[] = [
    { id: 1, title: 'Mathematics 101', description: 'Intro to Math', teacherId: 1, teacherName: 'Prof. A' },
    { id: 2, title: 'Physics 101', description: 'Intro to Physics', teacherId: 1, teacherName: 'Prof. A' }
  ];

  private students: Student[] = [
    { id: 1, name: 'John Doe', prn: 'PRN001', email: 'john@example.com', enrolledCourses: [this.courses[0]] },
    { id: 2, name: 'Jane Smith', prn: 'PRN002', email: 'jane@example.com', enrolledCourses: [this.courses[0], this.courses[1]] }
  ];

  private grades: Grade[] = [
    { id: 1, studentId: 1, courseId: 1, score: 85, studentName: 'John Doe', courseName: 'Mathematics 101' },
    { id: 2, studentId: 2, courseId: 1, score: 90, studentName: 'Jane Smith', courseName: 'Mathematics 101' },
    { id: 3, studentId: 2, courseId: 2, score: 88, studentName: 'Jane Smith', courseName: 'Physics 101' }
  ];

  constructor() { }

  // Get teacher courses
  getCourses(): Observable<Course[]> {
    return of(this.courses);
  }

  // Get course details
  getCourse(id: number): Observable<Course> {
    const course = this.courses.find(c => c.id === id)!;
    return of(course);
  }

  // Get students enrolled in a course
  getStudentsByCourse(courseId: number): Observable<Student[]> {
    const studentsInCourse = this.students.filter(student =>
      student.enrolledCourses?.some(course => course.id === courseId)
    );
    return of(studentsInCourse);
  }

  // Get grades for a course
  getGradesByCourse(courseId: number): Observable<Grade[]> {
    const courseGrades = this.grades.filter(grade => grade.courseId === courseId);
    return of(courseGrades);
  }

  // Update or create grade
  saveGrade(grade: Grade): Observable<Grade> {
    if (grade.id) {
      const index = this.grades.findIndex(g => g.id === grade.id);
      if (index !== -1) {
        this.grades[index] = { ...grade };
      }
    } else {
      const newId = this.grades.length > 0 ? Math.max(...this.grades.map(g => g.id)) + 1 : 1;
      const newGrade = { ...grade, id: newId };
      this.grades.push(newGrade);
      grade = newGrade;
    }
    return of(grade);
  }
}
