# Digital Collections application

[![CircleCI](https://circleci.com/gh/nulib/digital-collections.svg?style=svg)](https://circleci.com/gh/nulib/digital-collections) [![Coverage Status](https://coveralls.io/repos/github/nulib/digital-collections/badge.svg?branch=deploy/staging)](https://coveralls.io/github/nulib/digital-collections?branch=deploy/staging)

This ReactJS application serves as the presentation layer for Northwestern's Next Generation Repository. It contains discovery UI components for searching, filtering, browsing and navigating of items against an AWS Elasticsearch index.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

[Node.js](https://nodejs.org/) must be installed on your system.

### Installing

```bash
git clone git@github.com:nulib/digital-collections.git
cd digital-collections

git checkout deploy/staging
yarn install
```

## Running a local development environment

### Against production data

```bash
yarn start:use-real-data
```

### Against staging data

```bash
yarn start:use-staging-data
```

The Digital Collections application will be available at: https://devbox.library.northwestern.edu:3333/

#### Elasticsearch

If you'd like to view the Elasticsearch Production or Staging index while developing, run either of the following commands:

```
AWS_PROFILE=production es-proxy
```

or

```
AWS_PROFILE=staging es-proxy
```

The command will output a link, which you can copy and paste in your browser to view the Elasticsearch index, via Kibana.

## Running the tests

### End to end tests

This app uses [Cypress](https://www.cypress.io/) for integration tests. To start with mock SSO authentication support, run:

```
yarn cypress
```

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

We'll follow convention from Create React App for testing convention using Jest:
https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests

## Deployment

Merging a feature branch into the `deploy/staging` branch will automatically update the staging environment (http://dc.stack.rdc-staging.library.northwestern.edu/)

Merging `deploy/staging` branch into `master` will automatically update the production environment (https://dc.library.northwestern.edu/)

## ADR

To document architecture decisions, we use the [adr-tools](https://github.com/npryce/adr-tools) package. To document a new architecture decision via `adr-tools` markdown template generator, run:

```
adr new your-text-here
```

## Built With

- ReactJS - UI component library
- ReactiveSearch - Elasticsearch components library package
- Jest - Unit testing
- Cypress - End to End testing
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
