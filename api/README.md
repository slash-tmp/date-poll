# date-poll-api

This is a [Nest.js](https://nestjs.com/) project using [Prisma](https://www.prisma.io/).

## Installation

Create a Postgresql database (example using [Docker](https://www.docker.com/)):

```sh
docker run --name date-poll-db \
           --env POSTGRES_USER=db-user \
           --env POSTGRES_PASSWORD=db-password \
           --publish 127.0.0.1:5432:5432 \
           --detach \
             postgres:13
```

Add environment variables:

```sh
cp .env.example .env
```

- `DATABASE_URL`: fill with the database infos.

Run Prisma migrations:

```sh
pnpm prisma migrate dev
```

## Development

Start the development server on `http://localhost:4000`:

```bash
pnpm start:dev
```

API documentation is available on Swagger: [http://localhost:4000/api/swagger](http://localhost:4000/api/swagger).

## Test

Run Jest tests:

```sh
pnpm test
```
