<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Graph Database Prototype

Task description:

Goal: To create a backend application using NestJS and GraphDB. Drivine should be used as a database client. Instagram data schema has to be used. Data can be fetched from Instagram web API and persisted in the graph database using Drivine. Endpoints has to be exposed to query any of the available data from the graph database.

Outcome:

A backend app connected to a drivin supported graph database with a query-interface (no fancy UI necessary - plain REST to curl is fine) return some persisted instagram data

Tools which could be helpful:

- Drivine starter repo (Nestjs, Typescript) (https://github.com/liberation-data/drivine-inspiration)

- Open Source Database Schemas (OSDS) Instagram (https://github.com/Vheissu/Open-Source-Database-Schemas/blob/master/vheissu-instagram-schema.md)

- instagram-web-api (https://github.com/jlobos/instagram-web-api) and instagram-private-api (https://github.com/dilame/instagram-private-api) to get real data from instagram

## Installation

```bash
$ npm install
```

## Environment Variables

- Rename the .env.sample file to .env
- Update the following entries.

```bash
INSTAGRAM_USERNAME=<YOUR-INSTAGRAM-USERNAME>
INSTAGRAM_PASSWORD=<YOUR-INSTAGRAM-PASSWORD>

```

## Running the app

```bash
# development
$ npm run start

```

## Endpoints

Execute the following endpoints sequentially in order to fetch data using Instagram API and save it to database before viewing it.

```bash
# fetch and save user to the local database
http://localhost:3000/instagram/user/<IMSTAGRAM-USERNAME>
```

```bash
# get all users from local database
http://localhost:3000/local/users
```

Note: INSTAGRAM-USERID is exactly the same value as the id field from the previous endpoint.

```bash
# fetch and save followers of the user to the local database
http://localhost:3000/instagram/follows/<INSTAGRAM-USERID>
```

```bash
# fetch followers of the user from the local database
http://localhost:3000/local/userWithFollowers/<INSTAGRAM-USERID>
```

Other endpoints:

```bash
# get one user from local database
http://localhost:3000/local/users/<IMSTAGRAM-USERNAME>
```

## Stay in touch

- Author - [Ramu Ramasamy]
