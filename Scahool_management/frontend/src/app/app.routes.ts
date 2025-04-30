import { Routes } from '@angular/router';

import { StudentsComponent } from './students/students.component';
import { InstructorsComponent } from './instructors/instructors.component';
import { CoursesComponent } from './courses/courses.component';
import { DepartmentsComponent } from './departments/departments.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'instructors', component: InstructorsComponent},
  { path: 'courses', component: CoursesComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'signup', component: SignupComponent },
];
