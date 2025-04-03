import { Teacher } from '../models/teacher.interface';

export const mockTeachers: Teacher[] = [
  {
    id: 1,
    name: '张老师',
    age: 35,
    gender: 'male',
    phone: '13800138001',
    email: 'zhang@example.com',
    subject: ['数学', '物理'],
    education: '硕士',
    title: '高级教师',
    joinDate: new Date('2020-09-01'),
    status: 'active',
    idNumber: '110101199001011234',
    address: '北京市朝阳区',
    emergencyContact: {
      name: '张太太',
      phone: '13900139001',
      relationship: '配偶'
    }
  },
  {
    id: 2,
    name: '李老师',
    age: 42,
    gender: 'female',
    phone: '13800138002',
    email: 'li@example.com',
    subject: ['语文', '英语'],
    education: '博士',
    title: '特级教师',
    joinDate: new Date('2018-03-15'),
    status: 'active',
    idNumber: '310101198001011234',
    address: '上海市浦东新区',
    emergencyContact: {
      name: '李先生',
      phone: '13900139002',
      relationship: '配偶'
    }
  },
  {
    id: 3,
    name: '王老师',
    age: 38,
    gender: 'male',
    phone: '13800138003',
    email: 'wang@example.com',
    subject: ['化学', '生物'],
    education: '硕士',
    title: '高级教师',
    joinDate: new Date('2019-07-01'),
    status: 'active',
    idNumber: '440101198501011234',
    address: '广州市天河区',
    emergencyContact: {
      name: '王太太',
      phone: '13900139003',
      relationship: '配偶'
    }
  },
  {
    id: 4,
    name: '刘老师',
    age: 45,
    gender: 'female',
    phone: '13800138004',
    email: 'liu@example.com',
    subject: ['历史', '政治'],
    education: '博士',
    title: '特级教师',
    joinDate: new Date('2017-09-01'),
    status: 'active',
    idNumber: '440301197801011234',
    address: '深圳市南山区',
    emergencyContact: {
      name: '刘先生',
      phone: '13900139004',
      relationship: '配偶'
    }
  },
  {
    id: 5,
    name: '陈老师',
    age: 33,
    gender: 'male',
    phone: '13800138005',
    email: 'chen@example.com',
    subject: ['地理', '信息技术'],
    education: '硕士',
    title: '中级教师',
    joinDate: new Date('2021-03-01'),
    status: 'active',
    idNumber: '510101199101011234',
    address: '成都市武侯区',
    emergencyContact: {
      name: '陈太太',
      phone: '13900139005',
      relationship: '配偶'
    }
  }
]; 