import { Course } from './course.model';

export interface Student {
  id: number;
  name: string;
  prn: string;
  email: string;
  enrolledCourses?: Course[];
}
