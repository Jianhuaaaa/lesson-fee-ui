export interface Teacher {
  id: number;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email: string;
  subject: string[];        // 教授科目
  education: string;        // 学历
  title: string;           // 职称
  joinDate: Date;          // 入职日期
  status: 'active' | 'inactive';
  idNumber: string;        // 身份证号
  address: string;         // 地址
} 