import { IsIn } from 'class-validator';

class Choice {
  id: number;
  date: Date;
}

class Response {
  id: number;
  choiceId: number;

  @IsIn(['YES', 'MAYBE', 'NO'])
  value: 'YES' | 'MAYBE' | 'NO';
}

export class Respondent {
  id: number;
  name: string;
  responses: Response[];
}

export class PublicPoll {
  id: number;
  publicUid: string;
  title: string;
  description: string | null;
  endDate: Date | null;
  hideVotes: boolean;
  adminName: string | null;

  choices: Choice[];
  respondents?: Respondent[];
}
