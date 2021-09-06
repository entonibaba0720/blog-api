import { BlogEntry } from '../../blog/models/blog-entry.interface';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface User {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  blogEntries?: BlogEntry[];
}
