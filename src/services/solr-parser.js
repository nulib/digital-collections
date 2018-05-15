import * as globalVars from './global-vars';
import * as iiifParser from './iiif-parser';

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
    docObj.manifestUrl = `${globalVars.DEVBOX_URL}concern/${uriSegment}/${
      doc.id
    }/manifest`;

    return docObj;
  });
  return helperArray;
}

function constructCollectionCarouseltItems(docs) {
  const items = docs.map(doc => {
    let obj = {
      description: [],
      id: doc.id,
      imageUrl: doc.thumbnail_iiif_url_ss
        ? `${doc.thumbnail_iiif_url_ss}${globalVars.IIIF_MEDIUM_ITEM_REGION}`
        : '',
      label: doc.title_tesim[0],
      metadata: null
    };

    return obj;
  });
  return items;
}

export async function extractCarouselData(solrResponse, modelType) {
  const { response } = solrResponse;
  let obj = {};

  // Total records found
  obj.numFound = response.numFound;

  /////////////////////////////////////////////////////
  // Get 'Image' model data from a combination of Solr documents and IIIF manifests
  // /////////////////////////////////////////////////
  if (modelType === globalVars.IMAGE) {
    const helperArray = buildSolrHelperObj(response.docs);
    // Fetch all manifests, or return if there was an error retrieving manifests
    const manifests = await getManifests(helperArray);
    console.log('manifests', manifests);

    if (!manifests) {
      return;
    }
    obj.items = iiifParser.constructCarouselItems(manifests);
  }
  /////////////////////////////////////////////////////
  // Get 'Collection' model data from Solr, from the Solr documents directly
  // //////////////////////////////////////////////////
  else if (modelType === globalVars.COLLECTION) {
    obj.items = constructCollectionCarouseltItems(response.docs);
  }

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
