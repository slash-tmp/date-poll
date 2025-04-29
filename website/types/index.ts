/**
 * Represents a specific date, which can contain multiple choices
 * (at different times) with their respondents.
 */
type RespondentsPerChoiceBase<R> = {
  date: string;
  times: {
    id: number;
    time: string;
    respondents: R;
  }[];
};

type Respondents = {
  name: string;
  value?: string;
}[];

export type AdminRespondentsPerChoice = RespondentsPerChoiceBase<Respondents>;

export type PublicRespondentsPerChoice = RespondentsPerChoiceBase<
  Respondents | undefined
>;
