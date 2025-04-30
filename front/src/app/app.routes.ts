import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { StudentManagementComponent } from './components/admin/student-management/student-management.component';
import { TeacherManagementComponent } from './components/admin/teacher-management/teacher-management.component';
import { CourseManagementComponent } from './components/admin/course-management/course-management.component';
import { TeacherDashboardComponent } from './components/teacher/teacher-dashboard/teacher-dashboard.component';
import { CourseViewComponent as TeacherCourseViewComponent } from './components/teacher/course-view/course-view.component';
import { StudentDashboardComponent } from './components/student/student-dashboard/student-dashboard.component';
import { CourseViewComponent as StudentCourseViewComponent } from './components/student/course-view/course-view.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {path:'',component:HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { 
    path: 'admin', 
    //canActivate: [AuthGuard], // Uncomment this line when you have an auth guard
    children: [
      { path: '', component: AdminDashboardComponent }, // This makes /admin route work
      { path: 'students', component: StudentManagementComponent },
      { path: 'teachers', component: TeacherManagementComponent },
      { path: 'courses', component: CourseManagementComponent }
    ]
  },
  { 
    path: 'teacher', 
    //canActivate: [AuthGuard], // Uncomment this line when you have an auth guard
    children: [
      { path: '', component: TeacherDashboardComponent }, // This makes /teacher route work
      { path: 'courses/:id', component: TeacherCourseViewComponent }
    ]
  },
  { 
    path: 'student', 
    //canActivate: [AuthGuard], // Uncomment this line when you have an auth guard
    children: [
      { path: '', component: StudentDashboardComponent }, // This makes /student route work
      { path: 'courses/:id', component: StudentCourseViewComponent }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }

];