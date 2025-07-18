import { TaskStatus } from '@prisma/client';
import { Expose, Type, plainToInstance } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  @Expose()
  @IsString({ message: 'Title is required and must be a string' })
  @IsNotEmpty()
  title: string = '';

  @Expose()
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @Expose()
  @IsOptional()
  @IsEnum(['PENDING', 'IN_PROGRESS', 'DONE'], {
    message: 'Status must be PENDING, IN_PROGRESS or DONE',
  })
  status?: string = '';
  
  @Expose()
  @IsOptional()
  extras?: Record<string, any>;
}

export class UpdateTaskStatusDto {
   @IsEnum(['PENDING', 'IN_PROGRESS', 'DONE'], {
    message: 'Status must be PENDING, IN_PROGRESS or DONE',
  })
  @Expose()
  status!: TaskStatus;
}
