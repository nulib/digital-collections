import { DEVBOX_URL } from './global-vars';

/**
 * Helper array to store each item's 'id' and 'manifest url'
 * We need the manifest json object, which holds source url our application needs
 * to represent the image in a browser.
 * @param  {Array} docs From the raw Solr response
 * @return {Array}  helperArray Array of helper objects: each item's 'id' and 'manifest url'
 */
function buildSolrHelperObj(docs) {
  const helperArray = docs.map(doc => {
    let docObj = {};
    const uriSegment = getModelUriSegment(doc.has_model_ssim);

    docObj.id = doc.id;
    docObj.manifestUrl = `${DEVBOX_URL}concern/${uriSegment}/${
      doc.id
    }/manifest`;

    return docObj;
  });
  return helperArray;
}

/**
 * Put together all the data which carousels need to load and display proper data
 * @param  {array} manifests An array of 2.0 IIIF manifests
 * @return {array} An array of objects which contain data that will feed a carousel
 */
// TODO: Better set up 'metadata' below if we're going to use it?  Saves from front end from having to parse it.
function constructCarouselItems(manifests) {
  const iiifSizeDefinition = '/square/,175/0/default.jpg';
  const items = manifests.map(manifest => {
    const { label, description, metadata } = manifest;
    let obj = {
      label,
      description,
      metadata
    };
    const iiifRootUrl =
      manifest.sequences[0].canvases[0].images[0].resource.service['@id'];
    obj.imageUrl = `${iiifRootUrl}${iiifSizeDefinition}`;

    return obj;
  });
  return items;
}

export async function extractCarouselData(solrResponse) {
  const { response } = solrResponse;
  const helperArray = buildSolrHelperObj(response.docs);
  let obj = {};

  // Total records found
  obj.numFound = response.numFound;

  // Fetch all manifests, or return if there was an error retrieving manifests
  const manifests = await getManifests(helperArray);
  console.log('manifests', manifests);
  if (!manifests) {
    return;
  }

  // Put together data the carousel needs
  obj.items = constructCarouselItems(manifests);

  return obj;
}

/**
 * Fetch IIIF manifests for supplied manifest urls
 * @param  {Array} helperArray An array of objects which delivers an item's id and manifest url
 * @return {Array} An array of IIIF manifest objects
 */
async function getManifests(helperArray) {
  let promises = [];
  for (let item of helperArray) {
    promises.push(fetch(item.manifestUrl).then(response => response.json()));
  }
  const manifests = await Promise.all(promises)
    .then(response => response)
    .catch(error => console.log(error));

  return manifests;
}

/**
 * Mapping of all possible work types Solr knows about, to how these work types are represented in a Hyrax URL
 * ie. 'Image' translates into 'images' in the following url: http://devbox.library.northwestern.edu/concern/images/7e2ca0a5-3a2e-4074-a475-944710e07b2f
 * @return {Map} An ES2015 Map, which is like an Object, but better suited here for a key/value store.
 */
function getModelUriMap() {
  let modelUriMap = new Map();
  modelUriMap.set('Image', 'images');
  return modelUriMap;
}

export function getModelUriSegment(has_model_ssim) {
  const modelUriMap = getModelUriMap();
  const segment = modelUriMap.get(has_model_ssim[0]);
  return segment;
}
