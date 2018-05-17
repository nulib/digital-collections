import * as globalVars from './global-vars';

function constructCarouselItems(docs, modelType) {
  const iiifUrlKey =
    modelType === globalVars.COLLECTION
      ? 'thumbnail_iiif_url_ss'
      : 'file_set_iiif_urls_ssim';
  const items = docs.map(doc => {
    let obj = {
      id: doc.id,
      imageUrl: doc[iiifUrlKey]
        ? `${doc[iiifUrlKey]}${globalVars.IIIF_MEDIUM_ITEM_REGION}`
        : '',
      label: doc.title_tesim[0]
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
  obj.items = constructCarouselItems(response.docs, modelType);

  return obj;
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
