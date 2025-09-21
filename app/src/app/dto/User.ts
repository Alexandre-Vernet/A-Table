import { Recipe } from "./Recipe";

export interface User {
  id?: number;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  confirmPassword?: string;
  createdAt?: Date;
  updatedAt?: Date;
  recipes?: Recipe[];
}
