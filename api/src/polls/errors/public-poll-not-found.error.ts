export class PublicPollNotFoundError extends Error {
  constructor(publicId: string) {
    super(`Public poll "${publicId}" not found`);
  }
}
