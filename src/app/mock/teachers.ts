import { Teacher } from '../models/teacher.interface';

export const mockTeachers: Teacher[] = [
  {
    id: 1,
    name: '张三',
    age: 35,
    gender: 'male',
    phone: '13800138000',
    email: 'zhangsan@example.com',
    subject: ['数学', '物理'],
    education: '硕士',
    title: '高级教师',
    joinDate: new Date('2020-09-01'),
    status: 'active',
    idNumber: '110101199001011234',
    address: '北京市朝阳区',
    emergencyContact: {
      name: '李四',
      phone: '13900139000',
      relationship: '配偶'
    }
  },
  {
    id: 2,
    name: '李四',
    age: 32,
    gender: 'female',
    phone: '13800138001',
    email: 'lisi@example.com',
    subject: ['语文', '英语'],
    education: '本科',
    title: '中级教师',
    joinDate: new Date('2021-09-01'),
    status: 'active',
    idNumber: '110101199001011235',
    address: '北京市海淀区',
    emergencyContact: {
      name: '王五',
      phone: '13900139001',
      relationship: '配偶'
    }
  },
  {
    id: 3,
    name: '王五',
    age: 45,
    gender: 'male',
    phone: '13800138002',
    email: 'wangwu@example.com',
    subject: ['化学', '生物'],
    education: '博士',
    title: '特级教师',
    joinDate: new Date('2015-09-01'),
    status: 'active',
    idNumber: '110101199001011236',
    address: '北京市西城区',
    emergencyContact: {
      name: '赵六',
      phone: '13900139002',
      relationship: '配偶'
    }
  }
]; 