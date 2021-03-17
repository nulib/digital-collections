# FEN application

[![CircleCI](https://circleci.com/gh/nulib/digital-collections.svg?style=svg)](https://circleci.com/gh/nulib/digital-collections) [![Coverage Status](https://coveralls.io/repos/github/nulib/digital-collections/badge.svg?branch=deploy/staging)](https://coveralls.io/github/nulib/digital-collections?branch=deploy/staging)

This ReactJS application serves as the presentation layer for contents ingested through Northwestern Libraries new ingestion application, [Meadow](https://github.com/nulib/meadow). It contains discovery UI components for searching, filtering, browsing and navigating of items against an AWS Elasticsearch index.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

[Node.js](https://nodejs.org/) must be installed on your system.

### Installing

```bash
git clone git@github.com:nulib/digital-collections.git
cd digital-collections

git checkout deploy/fen
yarn install
```

## Running a local development environment

### Against staging data

```bash
yarn start:use-staging-data
```

The Digital Collections Fen application will be available at: https://devbox.library.northwestern.edu:3333/

#### Elasticsearch API

To view the Elasticsearch index via Kibana, run the following to autheticate with AWS and initiate `es-proxy`:

```
export AWS_PROFILE=staging
aws-adfs login  --profile=$AWS_PROFILE

// Now start es-proxy which will output a local Kibana URL
es-proxy

```

The command will output a link, which you can copy and paste in your browser to view the Elasticsearch index, via Kibana.

## Running the tests

### Unit Tests

Unit tests are handled via Jest and @testing-library:
https://facebook.github.io/jest/

If your dev environment is Mac OSX, you'll need to install `watchman` to run the tests (at this current time). If you use HomeBrew:

```
brew install watchman
```

Then to run unit tests:

```
yarn test
```

## Deployment

Merging a feature branch into the `deploy/fen` branch will automatically update the staging environment (http://fen.rdc-staging.library.northwestern.edu/)

There currently is no production environment for Fen.

## ADR

To document architecture decisions, we use the [adr-tools](https://github.com/npryce/adr-tools) package. To document a new architecture decision via `adr-tools` markdown template generator, run:

```
adr new your-text-here
```

## Built With

- ReactJS - UI component library
- ReactiveSearch - Elasticsearch components library package
- Jest - Unit testing
- Northwestern Global Marketing design templates

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

- Adam J. Arling <aarling@gmail.com>
- Divya Katpally <katdivyareddy@gmail.com>
- Karen Shaw <karendid@gmail.com>
- Brendan Quinn <brendan-quinn@northwestern.edu>
- Michael B. Klein <mbklein@gmail.com>

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
