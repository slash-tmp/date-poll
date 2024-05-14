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
  /**
   * @example "Trip to the museum"
   */
  @IsString()
  title: string;

  /**
   * @example "We are going to the natural history museum."
   */
  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @ValidateNested()
  @Type(() => CreatePollDtoChoice)
  choices: CreatePollDtoChoice[];

  /** Should current responses be hidden from respondents. */
  @IsBoolean()
  hideVotes: boolean;

  @Type(() => Date)
  @IsDate({ message: 'endDate must be an ISO8601 date string' })
  @IsOptional()
  endDate?: Date;

  /** Should an email notifications be sent for each new response to the poll */
  @IsBoolean()
  notifyOnResponse: boolean;

  /**
   * @example "Bob Bobbington"
   */
  @IsString()
  @IsOptional()
  adminName?: string;

  /**
   * Email address which will receive the poll creation confirmation email and possibly response notifications
   * @example "bob@domain.com"
   */
  @IsEmail()
  adminEmail: string;
}

export class CreatePollDtoChoice {
  @Type(() => Date)
  @IsDate({ message: 'date must be an ISO8601 date string' })
  date: Date;
}
