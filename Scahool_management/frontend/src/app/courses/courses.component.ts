

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../app.config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  imports: [CommonModule, FormsModule],
})
export class CoursesComponent implements OnInit {
  courses: any[] = [];
  courseForm = { course_id: '', title: '', dept_name: '', credits: '' };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    this.http.get<any[]>(`${appConfig.apiUrl}/courses`).subscribe((data) => {
      this.courses = data;
    });
    
  }

  addCourse() {
    this.http.post(`${appConfig.apiUrl}/courses`, this.courseForm).subscribe(() => { 
      this.getCourses();
      this.resetForm();
    }, error => {
      console.error("Error adding course:", error);
    });
  }
  resetForm() {
    this.courseForm = { course_id: '', title: '', dept_name: '', credits: '' };
  }

  deleteCourse(course_id: string) {
    this.http.delete(`${appConfig.apiUrl}/courses/${course_id}`).subscribe(() => {
      this.getCourses();
    });
  }

  editCourse(course: any) {
    this.courseForm = { ...course };
  }
}
