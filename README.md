# Next Generation Presentation Layer

[![CircleCI](https://circleci.com/gh/nulib/next-gen-front-end-react.svg?style=svg)](https://circleci.com/gh/nulib/next-gen-front-end-react) [![Coverage Status](https://coveralls.io/repos/github/nulib/next-gen-front-end-react/badge.svg?branch=deploy/staging)](https://coveralls.io/github/nulib/next-gen-front-end-react?branch=deploy/staging)

This ReactJS application serves as the presentation layer for Northwestern's Next Generation Repository. It contains discovery UI components for searching, filtering, browsing and navigation of items ingested through Hyrax.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- NULib `devstack` environment installed and running
- https://github.com/nulib/devstack

### Installing

```bash
git clone git@github.com:nulib/next-gen-front-end-react.git
cd next-gen-front-end-react
git checkout deploy/staging
yarn install
```

## Running a local development environment

### Start Docker containers

- Open a terminal tab, navigate to your `donut` (https://github.com/nulib/donut) repository directory and start the Docker environment.

```
checkout deploy/staging
devstack up donut glaze
```

### Start the React front-end application

Open another terminal tab, navigate to your local `next-gen-front-end-react` repository directory, `checkout` the `deploy/staging` branch and run:

#### (Recommended): Using production data

```bash
start:use-real-data
```

#### (No longer fully supported): Using local Donut data

```
yarn start
```

The React app will be available at: http://devbox.library.northwestern.edu:3333/

### (optional) Start Rails application

In another terminal tab, within the `donut` repository run:

```
bundle exec rails s
```

## Running the tests

### End to end tests

We use [Cypress](https://www.cypress.io/) for end to end tests. To start end to end tests, run:

```
yarn cypress open
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

## Built With

- ReactJS - UI component library
- Redux - state management
- Northwestern Global Marketing design templates

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

- NU Dev list here

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
