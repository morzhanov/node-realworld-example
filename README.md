# node-realworld-example

[![Build Status](https://travis-ci.org/morzhanov/node-realworld-example.svg?branch=master)](https://travis-ci.org/morzhanov/node-realworld-example)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![Dependency Status](https://david-dm.org/morzhanov/node-realworld-example.svg)](https://david-dm.org/morzhanov/node-realworld-example)
[![devDependency Status](https://david-dm.org/morzhanov/node-realworld-example.svg)](https://david-dm.org/morzhanov/node-realworld-example#info=devDependencies)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/morzhanov/node-realworld-example/issues)
[![Semver](http://img.shields.io/SemVer/2.0.0.png)](http://semver.org/spec/v2.0.0.html)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.png?v=103)](https://github.com/morzhanov/node-realworld-example/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

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

## SSL

```
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
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

