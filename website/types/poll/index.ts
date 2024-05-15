// Form data to create a new poll
export interface CreatePollFormData {
  title: string;
  description: string | null;
  choices: { date: string | null; time: string | null }[];
  hideVotes: boolean;
  endDate: string | null;
  notifyOnResponse: boolean;
  adminName: string | null;
  adminEmail: string;
}

// Selected properties of `CreatePollFormData`
export type StepPayload = Partial<CreatePollFormData>;

interface Choice {
  id: number;
  date: Date;
}

interface Response {
  id: number;
  choiceId: number;
  value: "YES" | "MAYBE" | "NO";
}

interface Respondent {
  id: number;
  name: string;
  responses: Response[];
}

export interface PublicPoll {
  id: number;
  publicUid: string;
  title: string;
  description: string | null;
  endDate: Date | null;
  adminName: string | null;

  choices: Choice[];
  respondents?: Respondent[];
}

export interface AdminPoll extends PublicPoll {
  adminUid: string;
  notifyOnResponse: boolean;
  adminEmail: string;
  hideVotes: boolean;

  respondents: Respondent[];
}
