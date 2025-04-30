// components/teacher/teacher-dashboard/teacher-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TeacherService } from '../../../services/teacher.service';
import { Course } from '../../../models/course.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule // This provides routerLink directive
  ],
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {
  courses: Course[] = [];
  teacherName: string = '';
  
  constructor(
    private teacherService: TeacherService,
    private authService: AuthService
  ) { }
  
  ngOnInit(): void {
    this.loadCourses();
    const user = this.authService.getCurrentUser();
    if (user) {
      this.teacherName = user.username;
    }
  }
  
  loadCourses(): void {
    this.teacherService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }
}