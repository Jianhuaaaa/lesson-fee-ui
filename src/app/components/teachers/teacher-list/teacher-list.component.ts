import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Teacher } from '../../../models/teacher.interface';
import { TeacherService } from '../../../services/teacher.service';

interface Column {
  field: keyof Teacher 
  header: string;
  visible: boolean;
  type: 'text' | 'number' | 'select' | 'date' | 'group';
  options?: { value: string; label: string }[];
}

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss']
})
export class TeacherListComponent implements OnInit {
  teachers: Teacher[] = [];
  searchQuery = '';
  loading = false;
  error: string | null = null;
  editingTeacher: Teacher | null = null;
  isAdding = false;
  teacherForm: FormGroup;
  showColumnChooser = false;
  showForm = false;
  selectedTeacher: Teacher | undefined = undefined;

  columns: Column[] = [
    { field: 'name', header: '姓名', visible: true, type: 'text' },
    { field: 'age', header: '年龄', visible: true, type: 'number' },
    {
      field: 'gender', header: '性别', visible: true, type: 'select',
      options: [
        { value: 'male', label: '男' },
        { value: 'female', label: '女' }
      ]
    },
    { field: 'phone', header: '电话', visible: true, type: 'text' },
    { field: 'subject', header: '科目', visible: true, type: 'text' },
    {
      field: 'education', header: '学历', visible: true, type: 'select',
      options: [
        { value: '专科', label: '专科' },
        { value: '本科', label: '本科' },
        { value: '硕士', label: '硕士' },
        { value: '博士', label: '博士' }
      ]
    },
    {
      field: 'title', header: '职称', visible: true, type: 'select',
      options: [
        { value: '初级教师', label: '初级教师' },
        { value: '中级教师', label: '中级教师' },
        { value: '高级教师', label: '高级教师' },
        { value: '特级教师', label: '特级教师' }
      ]
    },
    { field: 'joinDate', header: '入职日期', visible: true, type: 'date' },
    {
      field: 'status', header: '状态', visible: true, type: 'select',
      options: [
        { value: 'active', label: '在职' },
        { value: 'inactive', label: '离职' }
      ]
    },
    { field: 'email', header: '邮箱', visible: false, type: 'text' },
    { field: 'idNumber', header: '身份证号', visible: false, type: 'text' },
    { field: 'address', header: '地址', visible: false, type: 'text' }
  ];

  constructor(
    private teacherService: TeacherService,
    private fb: FormBuilder
  ) {
    this.teacherForm = this.fb.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(70)]],
      gender: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^1[3-9]\d{9}$/)]],
      email: ['', [Validators.email]],
      subject: ['', [Validators.required]],
      education: ['', [Validators.required]],
      title: ['', [Validators.required]],
      joinDate: ['', [Validators.required]],
      status: ['active', [Validators.required]],
      idNumber: ['', [Validators.pattern(/^\d{17}[\dXx]$/)]],
      address: ['']
    });
  }

  ngOnInit() {
    this.loadTeachers();
  }

  loadTeachers() {
    this.loading = true;
    this.teacherService.getTeachers().subscribe({
      next: (teachers) => {
        this.teachers = teachers;
        this.loading = false;
      },
      error: (error) => {
        this.error = '加载教师列表失败';
        this.loading = false;
      }
    });
  }

  startAdd() {
    this.isAdding = true;
    this.editingTeacher = null;
    this.teacherForm.reset();
    this.teacherForm.patchValue({
      status: 'active'
    });
  }

  startEdit(teacher: Teacher) {
    this.isAdding = false;
    this.editingTeacher = teacher;
    this.teacherForm.patchValue({
      name: teacher.name,
      age: teacher.age,
      gender: teacher.gender,
      phone: teacher.phone,
      email: teacher.email,
      subject: teacher.subject.join(', '),
      education: teacher.education,
      title: teacher.title,
      joinDate: teacher.joinDate,
      status: teacher.status,
      idNumber: teacher.idNumber,
      address: teacher.address
    });
  }

  cancelEdit() {
    this.editingTeacher = null;
    this.isAdding = false;
    this.teacherForm.reset();
  }

  saveEdit() {
    if (this.teacherForm.valid) {
      this.loading = true;
      const formValue = this.teacherForm.value;

      // 处理科目数组
      const subjects = formValue.subject ?
        formValue.subject.split(',').map((s: string) => s.trim()) :
        this.editingTeacher?.subject || [];

      // 创建教师对象
      const teacherData: Teacher = {
        id: this.editingTeacher?.id || 0,
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
        address: formValue.address
      };

      const operation = this.editingTeacher ?
        this.teacherService.updateTeacher(teacherData) :
        this.teacherService.createTeacher(teacherData);

      operation.subscribe({
        next: () => {
          this.editingTeacher = null;
          this.isAdding = false;
          this.loadTeachers();
          this.loading = false;
        },
        error: (error) => {
          this.error = this.editingTeacher ? '更新教师信息失败' : '创建教师失败';
          this.loading = false;
        }
      });
    }
  }

  confirmDelete(teacher: Teacher) {
    if (confirm(`确定要删除教师 ${teacher.name} 吗？`)) {
      this.loading = true;
      this.teacherService.deleteTeacher(teacher.id.toString()).subscribe({
        next: (success) => {         
            this.loadTeachers();
          this.loading = false;
        },
        error: (error) => {
          this.error = '删除教师失败';
          this.loading = false;
        }
      });
    }
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.loading = true;
      this.teacherService.searchTeachers(this.searchQuery).subscribe({
        next: (teachers) => {
          this.teachers = teachers;
          this.loading = false;
        },
        error: (error) => {
          this.error = '搜索教师失败';
          this.loading = false;
        }
      });
    } else {
      this.loadTeachers();
    }
  }

  clearError() {
    this.error = null;
  }

  isEditing(teacher: Teacher): boolean {
    return this.editingTeacher?.id === teacher.id;
  }

  toggleColumnChooser() {
    this.showColumnChooser = !this.showColumnChooser;
  }

  toggleColumn(column: Column) {
    column.visible = !column.visible;
  }

  getFieldValue(teacher: Teacher, field: Column['field']): any {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      const parentObj = teacher[parent as keyof Teacher];
      if (parentObj && typeof parentObj === 'object') {
        return (parentObj as any)[child];
      }
      return undefined;
    }
    return teacher[field as keyof Teacher];
  }

  getOptionLabel(column: Column, value: any): string {
    if (!column.options) return '';
    const option = column.options.find(opt => opt.value === value);
    return option ? option.label : '';
  }

  showAddTeacherForm() {
    this.selectedTeacher = undefined;
    this.showForm = true;
  }

  hideForm() {
    this.showForm = false;
    this.selectedTeacher = undefined;
  }

  onSaveTeacher(teacher: Teacher) {
    this.loading = true;
    if (teacher.id) {
      this.teacherService.updateTeacher(teacher).subscribe({
        next: () => {
          this.loadTeachers();
          this.hideForm();
          this.loading = false;
        },
        error: (error) => {
          this.error = '更新教师信息失败';
          this.loading = false;
        }
      });
    } else {
      this.teacherService.createTeacher(teacher).subscribe({
        next: () => {
          this.loadTeachers();
          this.hideForm();
          this.loading = false;
        },
        error: (error) => {
          this.error = '创建教师失败';
          this.loading = false;
        }
      });
    }
  }
} 