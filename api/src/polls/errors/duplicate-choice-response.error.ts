export class DuplicateChoiceResponseError extends Error {
  constructor() {
    super(`Choices can only be responded to once per respondent.`);
  }
}
