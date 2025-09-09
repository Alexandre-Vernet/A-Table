export interface User {
  id?: number;
  email: string;
  password: string;
  confirmPassword?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
