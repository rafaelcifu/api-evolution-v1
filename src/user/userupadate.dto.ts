import { Length, IsEmail } from 'class-validator';

export class UserUpadateDTO {
  id?: string;
  name?: string;
  username?: string;

  // @IsEmail()
  email?: string;

  created_at?: string;
}
