import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Teacher } from '../../../models/teacher.interface';

@Component({
  selector: 'app-teacher-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.scss']
})
export class TeacherFormComponent implements OnInit {
  @Input() teacher?: Teacher;
  @Output() save = new EventEmitter<Teacher>();
  @Output() cancel = new EventEmitter<void>();

  teacherForm: FormGroup;
  loading = false;
  error: string | null = null;
  success = false;

  constructor(private fb: FormBuilder) {
    this.teacherForm = this.fb.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(70)]],
      gender: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^1[3-9]\d{9}$/)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      education: ['', [Validators.required]],
      title: ['', [Validators.required]],
      joinDate: ['', [Validators.required]],
      status: ['active', [Validators.required]],
      idNumber: ['', [Validators.required, Validators.pattern(/^\d{17}[\dXx]$/)]],
      address: ['', [Validators.required]],
      emergencyContact: this.fb.group({
        name: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.pattern(/^1[3-9]\d{9}$/)]],
        relationship: ['', [Validators.required]]
      })
    });
  }

  ngOnInit(): void {
    if (this.teacher) {
      this.teacherForm.patchValue(this.teacher);
    }
  }

  onSubmit(): void {
    if (this.teacherForm.valid) {
      this.loading = true;
      const formValue = this.teacherForm.value;
      
      // 处理科目数组
      const subjects = formValue.subject.split(',').map((s: string) => s.trim());
      
      // 创建完整的教师对象
      const teacherData: Teacher = {
        id: this.teacher?.id || 0, // 如果是编辑模式使用现有ID，否则使用0
        name: formValue.name,
        age: formValue.age,
        gender: formValue.gender,
        phone: formValue.phone,
        email: formValue.email,
        subject: subjects,
        education: formValue.education,
        title: formValue.title,
        joinDate: new Date(formValue.joinDate),
        status: formValue.status,
        idNumber: formValue.idNumber,
        address: formValue.address,
        emergencyContact: formValue.emergencyContact
      };

      this.save.emit(teacherData);
      this.loading = false;
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  resetForm(): void {
    this.teacherForm.reset();
    this.error = null;
    this.success = false;
  }
} 