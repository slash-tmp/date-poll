# Planito

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

### Staging environment

[Heroku](https://www.heroku.com) is used to handle staging deployements:

- Each pull request on `main` branch will trigger a new deployment. The URL is available on the GitHub PR.

- The `main` branch is deployed on [https://date-poll-production-210a482abfed.herokuapp.com](https://date-poll-production-210a482abfed.herokuapp.com).

### Production environment

[o2switch](https://www.o2switch.fr/) is used to handle production deployments:

1. Connect with SSH to o2switch (`ssh <user_id>@seconde.o2switch.net`).
2. Go to project folder and `git pull` to get the latest code version.
3. Build `website` and/or `api` projects with `pnpm run build`.
4. Restart `website` and/or `api` projects on o2switch cPanel interface.

## Tests

[Cypress](https://www.cypress.io/) is used to run end-to-end (e2e) tests to reproduce users behaviour.

There are 2 ways to run these tests:

```sh
# Run tests in the command line
pnpm cypress:run

# Open the Cypress app
pnpm cypress:open
```
