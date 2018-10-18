import * as globalVars from './global-vars';

function constructCarouselItems(docs, modelType) {
  const iiifUrlKey =
    modelType === globalVars.COLLECTION_MODEL
      ? 'thumbnail_iiif_url'
      : 'representative_file_url'; // this may not hold true as we get other types...

  const items = docs.map(doc => {
    let obj = {
      id: doc._id,
      type: modelType,
      imageUrl: doc._source[iiifUrlKey]
        ? `${doc._source[iiifUrlKey]}${globalVars.IIIF_MEDIUM_ITEM_REGION}`
        : '',
      label: doc._source.title.primary[0],
      description:
        doc._source.description.length > 0 ? doc._source.description[0] : ''
    };

    return obj;
  });
  return items;
}

export function extractCarouselData(elasticsearchResponse, modelType) {
  let obj = {};

  obj.numFound = elasticsearchResponse.hits.total;
  obj.items = constructCarouselItems(
    elasticsearchResponse.hits.hits,
    modelType
  );
  return obj;
}

function getIIIFUrlKey(modelType) {
  return modelType === globalVars.COLLECTION_MODEL
    ? 'thumbnail_iiif_url'
    : 'representative_file_url';
}

/**
 * Map data from elastic search response, to what the PhotoGrid component needs
 * @param {Object} elasticsearchResponse Raw elastic search response object
 * @param {String} modelType // Item or Collection?
 */
export function prepPhotoGridItems(elasticsearchResponse, modelType) {
  const iiifUrlKey = getIIIFUrlKey(modelType);
  const { hits } = elasticsearchResponse.hits;

  return hits.map(hit => ({
    id: hit._id,
    type: modelType,
    imageUrl: hit._source[iiifUrlKey]
      ? `${hit._source[iiifUrlKey]}${globalVars.IIIF_MEDIUM_ITEM_REGION}`
      : '',
    label: hit._source.title.primary[0],
    description:
      hit._source.description.length > 0 ? hit._source.description[0] : ''
  }));
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
