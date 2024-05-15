import { PublicPoll, Respondent } from './public-poll.dto';

export class AdminPoll extends PublicPoll {
  adminUid: string;
  notifyOnResponse: boolean;
  adminEmail: string;
  hideVotes: boolean;

  respondents: Respondent[];
}
