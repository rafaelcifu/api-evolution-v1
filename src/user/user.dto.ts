import {
  validate,
  validateOrReject,
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
} from 'class-validator';

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
