import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from '../../../services/teacher.service';
import { AuthService } from '../../../services/auth.service'; // Add this import
import { Course } from '../../../models/course.model';
import { Student } from '../../../models/student.model';
import { Grade } from '../../../models/grade.model';

@Component({
  selector: 'app-course-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.css']
})
export class CourseViewComponent implements OnInit {
  courseId: number = 0;
  course: Course | null = null;
  students: Student[] = [];
  grades: Grade[] = [];
  gradeForm: FormGroup;
  selectedStudent: Student | null = null;
  teacherName: string = ''; // Add this property
  
  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private formBuilder: FormBuilder,
    private authService: AuthService // Add this service
  ) {
    this.gradeForm = this.formBuilder.group({
      score: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = +params['id'];
      this.loadCourse();
      this.loadStudents();
      this.loadGrades();
    });
    
    // Add this to get teacher name
    const user = this.authService.getCurrentUser();
    if (user) {
      this.teacherName = user.username;
    }
  }
  
  // Rest of your component code remains the same
  loadCourse(): void {
    this.teacherService.getCourse(this.courseId).subscribe(course => {
      this.course = course;
    });
  }
  
  loadStudents(): void {
    this.teacherService.getStudentsByCourse(this.courseId).subscribe(students => {
      this.students = students;
    });
  }
  
  loadGrades(): void {
    this.teacherService.getGradesByCourse(this.courseId).subscribe(grades => {
      this.grades = grades;
    });
  }
  
  selectStudent(student: Student): void {
    this.selectedStudent = student;
    
    // Find existing grade for this student
    const existingGrade = this.grades.find(g => g.studentId === student.id && g.courseId === this.courseId);
    
    if (existingGrade) {
      this.gradeForm.setValue({
        score: existingGrade.score
      });
    } else {
      this.gradeForm.reset();
    }
  }
  
  onSubmit(): void {
    if (this.gradeForm.invalid || !this.selectedStudent) {
      return;
    }
    
    const existingGrade = this.grades.find(g => 
      g.studentId === this.selectedStudent!.id && g.courseId === this.courseId
    );
    
    const grade: Grade = {
      id: existingGrade ? existingGrade.id : 0,
      studentId: this.selectedStudent.id,
      courseId: this.courseId,
      score: this.gradeForm.value.score
    };
    
    this.teacherService.saveGrade(grade).subscribe(() => {
      this.loadGrades();
      this.selectedStudent = null;
      this.gradeForm.reset();
    });
  }
  
  getStudentGrade(studentId: number): number | null {
    const grade = this.grades.find(g => g.studentId === studentId && g.courseId === this.courseId);
    return grade ? grade.score : null;
  }
}