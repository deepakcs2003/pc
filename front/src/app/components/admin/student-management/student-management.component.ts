// components/admin/student-management/student-management.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Student } from '../../../models/student.model';
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Added required imports
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.css']
})
export class StudentManagementComponent implements OnInit {
  students: Student[] = [];
  studentForm: FormGroup;
  isEditing: boolean = false;
  currentStudentId: number | null = null;
  
  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder
  ) {
    this.studentForm = this.formBuilder.group({
      name: ['', Validators.required],
      prn: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }
  
  ngOnInit(): void {
    this.loadStudents();
  }
  
  loadStudents(): void {
    this.adminService.getStudents().subscribe(students => {
      this.students = students;
    });
  }
  
  onSubmit(): void {
    if (this.studentForm.invalid) {
      return;
    }
    
    const student: Student = {
      ...this.studentForm.value,
      id: this.currentStudentId || 0
    };
    
    if (this.isEditing && this.currentStudentId) {
      this.adminService.updateStudent(this.currentStudentId, student)
        .subscribe(() => {
          this.resetForm();
          this.loadStudents();
        });
    } else {
      this.adminService.createStudent(student)
        .subscribe(() => {
          this.resetForm();
          this.loadStudents();
        });
    }
  }
  
  editStudent(student: Student): void {
    this.isEditing = true;
    this.currentStudentId = student.id;
    this.studentForm.setValue({
      name: student.name,
      prn: student.prn,
      email: student.email
    });
  }
  
  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.adminService.deleteStudent(id).subscribe(() => {
        this.loadStudents();
      });
    }
  }
  
  resetForm(): void {
    this.isEditing = false;
    this.currentStudentId = null;
    this.studentForm.reset();
  }
}