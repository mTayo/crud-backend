import { Expose } from 'class-transformer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Invalid email' })
  @Expose()
  email: string = '';

  @IsString()
  @MinLength(6)
  @Expose()
  password: string = '';

  @IsOptional()
  @IsString()
  @Expose()
  fullName?: string;
}

export class LoginDto {
  @IsEmail({}, { message: 'Invalid email' })
  @Expose()
  email: string = '';

  @IsString()
  @Expose()
  password: string = '';

}
