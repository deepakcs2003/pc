import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Teacher } from '../../../models/teacher.model';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-teacher-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './teacher-management.component.html',
  styleUrls: ['./teacher-management.component.css']
})
export class TeacherManagementComponent implements OnInit {
  teachers: Teacher[] = [];
  teacherForm: FormGroup;
  isEditing: boolean = false;
  currentTeacherId: number | null = null;
  
  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder
  ) {
    this.teacherForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subjects: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.loadTeachers();
  }
  
  loadTeachers(): void {
    this.adminService.getTeachers().subscribe(teachers => {
      this.teachers = teachers;
    });
  }
  
  onSubmit(): void {
    if (this.teacherForm.invalid) {
      return;
    }
    
    // Convert subjects string to array
    const formValue = this.teacherForm.value;
    const subjects = formValue.subjects.split(',').map((subject: string) => subject.trim());
    
    const teacher: Teacher = {
      ...formValue,
      subjects,
      id: this.currentTeacherId || 0
    };
    
    if (this.isEditing && this.currentTeacherId) {
      this.adminService.updateTeacher(this.currentTeacherId, teacher)
        .subscribe(() => {
          this.resetForm();
          this.loadTeachers();
        });
    } else {
      this.adminService.createTeacher(teacher)
        .subscribe(() => {
          this.resetForm();
          this.loadTeachers();
        });
    }
  }
  
  editTeacher(teacher: Teacher): void {
    this.isEditing = true;
    this.currentTeacherId = teacher.id;
    
    // Convert subjects array to comma-separated string
    const subjectsString = teacher.subjects.join(', ');
    
    this.teacherForm.setValue({
      name: teacher.name,
      email: teacher.email,
      subjects: subjectsString
    });
  }
  
  deleteTeacher(id: number): void {
    if (confirm('Are you sure you want to delete this teacher?')) {
      this.adminService.deleteTeacher(id).subscribe(() => {
        this.loadTeachers();
      });
    }
  }
  
  resetForm(): void {
    this.isEditing = false;
    this.currentTeacherId = null;
    this.teacherForm.reset();
  }
}
