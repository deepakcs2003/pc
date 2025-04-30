

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../app.config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.css'],
  imports: [CommonModule, FormsModule],
})
export class InstructorsComponent implements OnInit {
  instructors: any[] = [];
  instructorForm = { ID: '', name: '', dept_name: '', salary: '' };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getInstructors();
  }

  getInstructors() {
    this.http.get<any[]>(`${appConfig.apiUrl}/instructors`).subscribe((data) => {
      this.instructors = data;
    });
    
  }

  addInstructor() {
    this.http.post(`${appConfig.apiUrl}/instructors`, this.instructorForm).subscribe(() => { 
      this.getInstructors();
      this.resetForm();
    }, error => {
      console.error("Error adding course:", error);
    });
  }

  resetForm() {
    this.instructorForm = { ID: '', name: '', dept_name: '', salary: '' };
  }


  deleteInstructor(ID: number) {
    this.http.delete(`${appConfig.apiUrl}/instructors/${ID}`).subscribe(() => {
      this.getInstructors();
    });
  }

  editInstructor(instructor: any) {
    this.instructorForm = { ...instructor };
  }
}
