# date-poll

## Installation

This project is a monorepository using [pnpm workspaces](https://pnpm.io/workspaces).

Install dependencies for both projects (`api` and `website`):

```sh
pnpm install
```

Copy API TypeScript types to website:

```sh
pnpm copytypes
```

## Development

See each project's documentation:

- [Website documentation](https://github.com/slash-tmp/date-poll/blob/main/website/README.md)
- [API documentation](https://github.com/slash-tmp/date-poll/blob/main/api/README.md)

## Deployment

[Heroku](https://www.heroku.com) is used to handle deployement:

- **Preview environment**: each pull request on `main` branch will trigger a new deployment. The URL is available on the GitHub PR page.

- **Production environment**: the `main` branch is deployed on [https://date-poll-production-210a482abfed.herokuapp.com](https://date-poll-production-210a482abfed.herokuapp.com).

## Tests

[Cypress](https://www.cypress.io/) is used to run end-to-end (e2e) tests to reproduce users behaviour.

There are 2 ways to run these tests:

```sh
# Run tests in the command line
pnpm cypress:run

# Open the Cypress app
pnpm cypress:open
```
