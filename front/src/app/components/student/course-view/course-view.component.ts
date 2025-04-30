import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { Course } from '../../../models/course.model';
import { Grade } from '../../../models/grade.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-view',
  standalone: true, // Add this because you are using 'imports'
  imports: [CommonModule, RouterModule], // Add these imports

  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.css']
})
export class CourseViewComponent implements OnInit {
  courseId: number = 0;
  course: Course | null = null;
  grades: Grade[] = [];
  isLoading: boolean = true;
  error: string | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) { }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = +params['id'];
      this.loadCourseData();
    });
  }
  
  loadCourseData(): void {
    this.isLoading = true;
    this.error = null;
    
    Promise.all([
      this.loadCourse(),
      this.loadGrades()
    ]).finally(() => {
      this.isLoading = false;
    });
  }
  
  loadCourse(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.studentService.getCourse(this.courseId).subscribe({
        next: (course) => {
          this.course = course;
          resolve();
        },
        error: (err) => {
          this.error = 'Failed to load course details. Please try again later.';
          reject(err);
        }
      });
    });
  }
  
  loadGrades(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.studentService.getGradesByCourse(this.courseId).subscribe({
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
  
  getGradeForCourse(): number | null {
    if (this.grades.length === 0) return null;
    return this.grades[0].score;
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
  
  refreshCourse(): void {
    this.loadCourseData();
  }
}