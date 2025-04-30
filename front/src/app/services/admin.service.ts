// services/admin.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Student } from '../models/student.model';
import { Teacher } from '../models/teacher.model';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private students: Student[] = [
    { id: 1, name: 'John Doe', prn: 'PRN001', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', prn: 'PRN002', email: 'jane@example.com' }
  ];

  private teachers: Teacher[] = [
    { id: 1, name: 'Prof. A', email: 'a@example.com', subjects: ['Math', 'Physics'] },
    { id: 2, name: 'Prof. B', email: 'b@example.com', subjects: ['Chemistry'] }
  ];

  private courses: Course[] = [
    { id: 1, title: 'Mathematics 101', description: 'Intro to Math', teacherId: 1, teacherName: 'Prof. A' },
    { id: 2, title: 'Physics 101', description: 'Intro to Physics', teacherId: 1, teacherName: 'Prof. A' }
  ];

  constructor() { }

  // Student operations
  getStudents(): Observable<Student[]> {
    return of(this.students);
  }
  
  getStudent(id: number): Observable<Student> {
    const student = this.students.find(s => s.id === id)!;
    return of(student);
  }
  
  createStudent(student: Student): Observable<Student> {
    student.id = this.students.length + 1;
    this.students.push(student);
    return of(student);
  }
  
  updateStudent(id: number, student: Student): Observable<Student> {
    const index = this.students.findIndex(s => s.id === id);
    if (index !== -1) {
      this.students[index] = { ...student, id };
    }
    return of(this.students[index]);
  }
  
  deleteStudent(id: number): Observable<any> {
    this.students = this.students.filter(s => s.id !== id);
    return of({ message: 'Student deleted successfully' });
  }

  // Teacher operations
  getTeachers(): Observable<Teacher[]> {
    return of(this.teachers);
  }
  
  getTeacher(id: number): Observable<Teacher> {
    const teacher = this.teachers.find(t => t.id === id)!;
    return of(teacher);
  }
  
  createTeacher(teacher: Teacher): Observable<Teacher> {
    teacher.id = this.teachers.length + 1;
    this.teachers.push(teacher);
    return of(teacher);
  }
  
  updateTeacher(id: number, teacher: Teacher): Observable<Teacher> {
    const index = this.teachers.findIndex(t => t.id === id);
    if (index !== -1) {
      this.teachers[index] = { ...teacher, id };
    }
    return of(this.teachers[index]);
  }
  
  deleteTeacher(id: number): Observable<any> {
    this.teachers = this.teachers.filter(t => t.id !== id);
    return of({ message: 'Teacher deleted successfully' });
  }

  // Course operations
  getCourses(): Observable<Course[]> {
    return of(this.courses);
  }
  
  getCourse(id: number): Observable<Course> {
    const course = this.courses.find(c => c.id === id)!;
    return of(course);
  }
  
  createCourse(course: Course): Observable<Course> {
    course.id = this.courses.length + 1;
    this.courses.push(course);
    return of(course);
  }
  
  updateCourse(id: number, course: Course): Observable<Course> {
    const index = this.courses.findIndex(c => c.id === id);
    if (index !== -1) {
      this.courses[index] = { ...course, id };
    }
    return of(this.courses[index]);
  }
  
  deleteCourse(id: number): Observable<any> {
    this.courses = this.courses.filter(c => c.id !== id);
    return of({ message: 'Course deleted successfully' });
  }
}
