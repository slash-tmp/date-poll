import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class UpdatePollDto {
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
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => UpdatePollDtoChoice)
  choices: UpdatePollDtoChoice[];

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
}

export class UpdatePollDtoChoice {
  @IsInt()
  @IsOptional()
  id?: number;

  @Type(() => Date)
  @IsDate({ message: 'date must be an ISO8601 date string' })
  date: Date;
}
