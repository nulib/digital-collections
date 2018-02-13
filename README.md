# Next Generation Presentation Layer
A front-end, ReactJS application for Northwestern's Next Generation Repository.  This application will serve as the presentation layer, containing discovery UI components for browsing and searching ingested items through the Hyrax Donut back-end.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites:
 * You must have a local donut instance running and available at http://devbox.library.northwestern.edu
 * You must have the `solr_wrapper` associated with that donut instance running locally and available at http://localhost:8983/
 * In the `package.json` file the app is configured to proxy donut in order to grab the IIIFManifests (we are just using the manifest to grab one image url for display until we have a viewer implemented)
 * Enable CORS for your local Solr instance. See #4 here: http://opensourceconnections.com/blog/2015/03/26/going-cross-origin-with-solr/. The file you want to edit is in `/tmp/solr-development/server/solr-webapp/WEB-INF/web.xml`
 * You must have collections and images (works + filesets) created in your local donut instance **with visibility set to public**

### Installing
```bash
$ git clone git@github.com:nulib/next-gen-front-end-react.git
$ cd next-gen-front-end-react
$ npm install
$ npm start
```

The app will be available at http://localhost:3333

### Collections Thumbnails
There is a field for Collection Thumbnails in Hyrax but it is not exposed in the UI. You can manually add a thumbnail to a collection in the rails console to ease development. You'll need the id of the collection and the id of an image that you want to use as the thumbnail.

```
cd <your local donut directory>
bundle exec rails c

c=Collection.find('b2a42c55-733a-4155-823b-dce6c157b206')
i=Image.find('8bd9acaf-31ec-4a4b-bf43-d319ac3a3863')
c.thumbnail_id = i.thumbnail_id
c.save
```

### Mock Data
If you want to use mock data instead of making API calls in order to do development, see the example in `/src/api/item-detail-api.js`

## Running the tests
Explain how to run the automated tests for this system

### End to End Tests

### Unit Tests
Explain what these tests test and why
```
Give an example
```

### Coding Style Tests
Explain what these tests test and why
```
Give an example
```

## Deployment
Add additional notes about how to deploy this on a live system

## Built With
* ReactJS - UI component library
* Others...

## Contributing
Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning
We use SemVer for versioning. For the versions available, see the tags on this repository.

## Authors
* NU Dev list here

## License
This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgements
* Hat tip to anyone who's code was used
* New York Public Library
* Google Art Project
