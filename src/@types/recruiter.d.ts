export interface Recruiter {
  id: number;
  firstName: string;
  lastName: any;
  email: string;
  password: string;
  invitationToken: any;
  invitationTokenExpires: any;
  isActive: boolean;
  role: 'employee' | 'admin';
  creationDate: string;
  modificationDate: string;
  company: Company;
  companyId: number;
}

export interface Company {
  id: number
  name: string
  address: string
  phone: string
  nit: string
  isActive: boolean
  creationDate: string
  modificationDate: string
}
