import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Course } from '../../../models/course.model';
import { Teacher } from '../../../models/teacher.model';
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-management',
  standalone: true, // Add this because you are using 'imports'
  imports: [CommonModule, ReactiveFormsModule], // Added required imports

  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css']
})
export class CourseManagementComponent implements OnInit {
  courses: Course[] = [];
  teachers: Teacher[] = [];
  courseForm: FormGroup;
  isEditing: boolean = false;
  currentCourseId: number | null = null;
  
  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder
  ) {
    this.courseForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      teacherId: ['', Validators.required],
      duration: ['', Validators.required],
    });
  }
  
  ngOnInit(): void {
    this.loadCourses();
    this.loadTeachers();
  }
  
  loadCourses(): void {
    this.adminService.getCourses().subscribe(courses => {
      this.courses = courses;
      
      // Add teacher names to courses
      this.courses.forEach(course => {
        const teacher = this.teachers.find(t => t.id === course.teacherId);
        course.teacherName = teacher ? teacher.name : 'Unknown';
      });
    });
  }
  
  loadTeachers(): void {
    this.adminService.getTeachers().subscribe(teachers => {
      this.teachers = teachers;
      // Refresh courses to update teacher names
      if (this.courses.length > 0) {
        this.loadCourses();
      }
    });
  }
  
  onSubmit(): void {
    if (this.courseForm.invalid) {
      return;
    }
    
    const course: Course = {
      ...this.courseForm.value,
      id: this.currentCourseId || 0
    };
    console.log(course)
    if (this.isEditing && this.currentCourseId) {
      this.adminService.updateCourse(this.currentCourseId, course)
        .subscribe(() => {
          this.resetForm();
          this.loadCourses();
        });
    } else {
      this.adminService.createCourse(course)
        .subscribe(() => {
          this.resetForm();
          this.loadCourses();
        });
    }
  }
  
  editCourse(course: Course): void {
    this.isEditing = true;
    this.currentCourseId = course.id;
    this.courseForm.setValue({
      title: course.title,
      description: course.description,
      teacherId: course.teacherId
    });
  }
  
  deleteCourse(id: number): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.adminService.deleteCourse(id).subscribe(() => {
        this.loadCourses();
      });
    }
  }
  
  resetForm(): void {
    this.isEditing = false;
    this.currentCourseId = null;
    this.courseForm.reset();
  }
}