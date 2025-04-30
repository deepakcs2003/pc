

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../app.config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  imports: [CommonModule, FormsModule],
})
export class StudentsComponent implements OnInit {
  students: any[] = [];
  studentForm = { ID: '', name: '', dept_name: '', tot_cred: '' };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getStudents();
  }

  getStudents() {
    this.http.get<any[]>(`${appConfig.apiUrl}/students`).subscribe((data) => {
      this.students = data;
    });
    
  }
 
  addStudent() {
    this.http.post(`${appConfig.apiUrl}/students`, this.studentForm).subscribe(() => { 
      this.getStudents();
      this.resetForm();
    }, error => {
      console.error("Error adding student:", error);
    });
  }
  

  resetForm() {
    this.studentForm = { ID: '', name: '', dept_name: '', tot_cred: '' };
  }

  
  deleteStudent(ID: number) {
    this.http.delete(`${appConfig.apiUrl}/students/${ID}`).subscribe(() => {
      this.getStudents();
    });
  }

  editStudent(student: any) {
    this.studentForm = { ...student };
  }
}
