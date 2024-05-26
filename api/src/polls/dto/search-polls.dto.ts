import { IsEmail } from 'class-validator';

export class SearchPollsDto {
  /**
   * Email address used to create the polls.
   * @example "bob@domain.com"
   */
  @IsEmail()
  adminEmail: string;
}
