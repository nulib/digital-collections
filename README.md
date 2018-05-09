# Next Generation Presentation Layer
This ReactJS application serves as the presentation layer for Northwestern's Next Generation Repository.  It contains discovery UI components for searching, filtering, browsing and navigation of items ingested through Hyrax.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing
```bash
$ git clone git@github.com:nulib/next-gen-front-end-react.git
$ cd next-gen-front-end-react
$ yarn install
$ yarn start
```

### Prerequisites for Development:
 * You must have a local DONUT (NU's Hyrax) instance running and available at http://devbox.library.northwestern.edu in order for this application to grab data.
 * You must have a Solr instance running and available at http://localhost:8983/
 * In the `package.json` file the app is configured to proxy Solr in order to grab the IIIF manifests.
 * You must have collections and images (works + filesets) created in your local donut instance **with visibility set to public**

The app will be available at http://localhost:3333

### Mock Data
Mock data feeding this application is no longer supported in `master`, however available in release/tag version `v1.1`.

## Running the tests
Unit tests are handled via Jest:
https://facebook.github.io/jest/

If your dev environment is Mac OSX, you'll need to install `watchman` to run the tests (at this current time).  If you use HomeBrew:
```
brew install watchman
```
Then to run tests:
```
yarn test
```

We'll follow convention from Create React App for testing convention using Jest:
https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests

### Coding Style Tests
All tests should live directly next to the files they're testing.  The files should be named as follows: `FileNameHere.test.js` An example directory looks like:
```
src/containers/HomePage.js
src/containers/HomePage.test.js
```

## Deployment
Add additional notes about how to deploy this on a live system

## Built With
* ReactJS - UI component library
* Redux - state management
* Northwestern Global Marketing design templates

## Contributing
Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning
We use SemVer for versioning. For the versions available, see the tags on this repository.

## Authors
* NU Dev list here

## License
This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgements
* New York Public Library
* Google Art Project
