import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true, // Add this because you are using 'imports'

  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  studentCount: number = 0;
  teacherCount: number = 0;
  courseCount: number = 0;
  
  constructor(private adminService: AdminService) { }
  
  ngOnInit(): void {
    this.loadDashboardData();
  }
  
  loadDashboardData(): void {
    this.adminService.getStudents().subscribe(students => {
      this.studentCount = students.length;
    });
    
    this.adminService.getTeachers().subscribe(teachers => {
      this.teacherCount = teachers.length;
    });
    
    this.adminService.getCourses().subscribe(courses => {
      this.courseCount = courses.length;
    });
  }
}
