# node-realworld-example

[![Build Status](https://travis-ci.org/morzhanov/node-realworld-example.svg?branch=master)](https://travis-ci.org/morzhanov/node-realworld-example)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![Dependency Status](https://david-dm.org/morzhanov/node-realworld-example.svg)](https://david-dm.org/morzhanov/node-realworld-example)
[![devDependency Status](https://david-dm.org/morzhanov/node-realworld-example.svg)](https://david-dm.org/morzhanov/node-realworld-example#info=devDependencies)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/morzhanov/node-realworld-example/issues)
[![Semver](http://img.shields.io/SemVer/2.0.0.png)](http://semver.org/spec/v2.0.0.html)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.png?v=103)](https://github.com/morzhanov/node-realworld-example/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<img src="https://i.imgur.com/VoeF0bU.png">

## This is an real worls node.js example that considers all main development best practicies.

Application based on Nest.js framework with GraphQL configuration. In This application you can review how to use graphql on both client and backend sides.

In this application you can find examples to review:

### Backend

- How to create base Nest.js server side application.
- How to setup GraphQL configuration on backend side using Apollo Graphql.
- How to connect PostgreSQL database via TypeORM and connect it to graphql resolvers.
- How to create or generate migrations for PostgreSQL tables using TypeORM.
- How to generate and use GraphQL queries, mutations and subscriptions.
- How to use PassportJS different strategies alongside with Apollo GraphQL.
- How to use GraphQL subscriptions with the PubSub.
- How to cache requests to the database using Redis.
- How to test your graphql resolvers and services using Jest.
- How to serve static files with Nest.js.
- E2E tests configuration.

### Frontend

- How to create base React application.
- How to connect apollo-client to React application.
- How to use graphql mutations, subscriptions and queries on client side.
- How to build your frontend application and serve it with Nest.js.
- Linter rules, prettier, webpack config, babel config, jest config setup.

### Deploynment

- How to use Docker to deploy and run application.
- How to use .env files.
- How to create base CI\CD configuration for TravisCI.
- How to run tests with TravisCI.
- How to deploy application on AWS cloud services using TravisCI.
- How to use RDS, ECR, ECS, EC2, Elasitcashe from AWS.

## Technologies:

- TypeScript
- Nest.js
- GraphQL
- TypeORM
- Passport.js
- PostgreSQL (RDS)
- Redis caching (Elastic cache)
- Docker (ECR)
- CI (Travis CI)
- React.js (latest, without state management library)
- S3 for satatic and images upload
- AWS (S3, EC2, RDS, AMI)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## SSL

To run application with TLS certificate perform next steps:

1. Generate TLS certificate using next command:

```
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

2. Move generated certificates to ssl folder.
3. Run application.

## Docker

```
docker build . -t ts-nest
docker run -i -t -p 3000:3000 ts-nest
```

Or if you can run bash then just,

```
sh run.sh
```

## TraviCI

1. Create TravisCI account and connect it to your GitHub account.
2. In repositories list choose this repository and create build configuration.
3. Travis will run tests and deploy on every push to the repository master branch.

## AWS

1. Create AWS Account
2. Add PostgreSQL DB in RDS
3. Add Redis in ElastiCache
4. Add repository in ECR
5. Add Task definition and Cluster in ECS
6. Add these invironment varialbles to Travis CI variables:
   ```
   AWS_ACCESS_KEY_ID
   AWS_DEFAULT_REGION
   AWS_SECRET_ACCESS_KEY
   CLUSTER_NAME             ## ECS
   IMAGE_REPO_URL           ## ECR
   SERVICE_NAME             ## ECS
   ```
7. Push to GitHub and run Travis CI pipeline
