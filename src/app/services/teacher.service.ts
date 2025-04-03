import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Teacher } from '../models/teacher.interface';
import { mockTeachers } from '../mock/teachers';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private teachers: Teacher[] = [...mockTeachers];

  constructor() { }

  getTeachers(): Observable<Teacher[]> {
    return of(this.teachers);
  }

  getTeacher(id: number): Observable<Teacher | undefined> {
    return of(this.teachers.find(teacher => teacher.id === id));
  }

  createTeacher(teacher: Omit<Teacher, 'id'>): Observable<Teacher> {
    const newTeacher: Teacher = {
      ...teacher,
      id: this.teachers.length + 1
    };
    this.teachers.push(newTeacher);
    return of(newTeacher);
  }

  updateTeacher(teacher: Teacher): Observable<Teacher> {
    const index = this.teachers.findIndex(t => t.id === teacher.id);
    if (index !== -1) {
      this.teachers[index] = teacher;
      return of(teacher);
    }
    throw new Error('Teacher not found');
  }

  deleteTeacher(id: number): Observable<boolean> {
    const index = this.teachers.findIndex(teacher => teacher.id === id);
    if (index !== -1) {
      this.teachers.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  searchTeachers(query: string): Observable<Teacher[]> {
    const searchQuery = query.toLowerCase();
    return of(this.teachers.filter(teacher => 
      teacher.name.toLowerCase().includes(searchQuery) ||
      teacher.email.toLowerCase().includes(searchQuery) ||
      teacher.phone.includes(searchQuery)
    ));
  }
} 