export class CannotChangeChoiceDateError extends Error {
  constructor(choiceId: number, existingDate: Date, newDate: Date) {
    super(
      `Choice date is readonly. Cannot update date of choice #${choiceId} from ${existingDate.toISOString()} to ${newDate.toISOString()}`,
    );
  }
}
