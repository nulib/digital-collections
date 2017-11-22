### Prerequisites:

 * You must have a local donut instance running and available at http://devbox.library.northwestern.edu
 * You must have the `solr_wrapper` associated with that donut instance running locally and available at http://localhost:8983/
 * In the `package.json` file the app is configured to proxy donut in order to grab the IIIFManifests (we are just using the manifest to grab one image url for display until we have a viewer implemented)
 * Enable CORS for your local Solr instance. See #4 here: http://opensourceconnections.com/blog/2015/03/26/going-cross-origin-with-solr/. The file you want to edit is in `/tmp/solr-development/server/solr-webapp/WEB-INF/web.xml`
 * You must have collections and images (works + filesets) created in your local donut instance **with visibility set to public**



### Developer Setup


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
