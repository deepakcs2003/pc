

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../app.config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-departments',
  standalone: true,
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
  imports: [CommonModule, FormsModule],
})
export class DepartmentsComponent implements OnInit {
  departments: any[] = [];
  departmentForm = { dept_name: '', building: '', budget: '' };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getDepartments();
  }

  getDepartments() {
  this.http.get<any[]>(`${appConfig.apiUrl}/departments`).subscribe((data) => {
    this.departments = data;
  });
}


  addDepartment() {
    this.http.post(`${appConfig.apiUrl}/departments`, this.departmentForm).subscribe(() => { 
      this.getDepartments();
      this.resetForm();
    }, error => {
      console.error("Error adding department:", error);
    });
  }

  resetForm() {
    this.departmentForm = { dept_name: '', building: '', budget: '' };
  }

  deleteDepartment(dept_name: string) {
    this.http.delete(`${appConfig.apiUrl}/departments/${dept_name}`).subscribe(() => {
      this.getDepartments();
    });
  }

  editDepartment(department: any) {
    this.departmentForm = { ...department };
  }
}
