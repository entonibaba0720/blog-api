import { User } from 'src/user/models/user.interface';

export interface BlogEntry {
  id?: number;
  author?: User;
  created?: Date;
  title?: string;
  tags?: string;
  body?: string;
}
