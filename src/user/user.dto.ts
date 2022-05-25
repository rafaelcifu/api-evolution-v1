import { Length, IsEmail } from 'class-validator';

export class UserDTO {
  id?: string;
  name?: string;
  username: string;

  @IsEmail()
  email: string;

  @Length(6, 20)
  password: string;

  created_at?: string;
}
