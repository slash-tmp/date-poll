import type { paths } from "../date-poll-api";

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

// GET /polls/admin/<admin_uid>
export type AdminPollApiResponse =
  paths["/polls/admin/{admin_uid}"]["get"]["responses"]["200"]["content"]["application/json"];

// POST /polls
export type CreatePollApiRequest =
  paths["/polls"]["post"]["requestBody"]["content"]["application/json"];
export type CreatePollApiResponse =
  paths["/polls"]["post"]["responses"]["201"]["content"]["application/json"];
