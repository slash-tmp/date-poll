import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreatePollDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @ValidateNested()
  @Type(() => CreatePollDtoChoice)
  choices: CreatePollDtoChoice[];

  @IsBoolean()
  hideVotes: boolean;

  @IsDate({ message: 'endDate must be an ISO8601 date string' })
  @IsOptional()
  endDate?: Date;

  @IsBoolean()
  notifyOnResponse: boolean;

  @IsString()
  @IsOptional()
  adminName?: string;

  @IsEmail()
  adminEmail: string;
}

export class CreatePollDtoChoice {
  @Type(() => Date)
  @IsDate({ message: 'date must be an ISO8601 date string' })
  date: Date;
}
