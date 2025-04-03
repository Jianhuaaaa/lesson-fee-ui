import { Routes } from '@angular/router';
import { TeacherListComponent } from './components/teachers/teacher-list/teacher-list.component';

export const routes: Routes = [
  { path: 'teachers', component: TeacherListComponent },
  { path: '', redirectTo: '/teachers', pathMatch: 'full' }
];
