# node-realworld-example

# TBD

## This is an real worls node.js example that considers all main development best practicies:

* TypeScript
* Nest.js
* GraphQL
* TypeORM
* Passport.js
* PostgreSQL (RDS)
* Redis caching (Elastic cache)
* Docker (ECR)
* CI (Travis CI)
* React.js (latest, without state management library)
* S3 for satatic and images upload
* AWS (S3, EC2, RDS, AMI)

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

## Docker

```
docker build . -t ts-nest
docker run -i -t -p 3000:3000 ts-nest
```

Or if you can run bash then just,
```
sh run.sh
```
