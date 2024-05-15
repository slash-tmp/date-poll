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
