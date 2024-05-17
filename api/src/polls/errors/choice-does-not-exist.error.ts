export class ChoiceDoesNotExistError extends Error {
  constructor(choiceId: number) {
    super(`Choice #${choiceId} does not exist on this poll`);
  }
}
