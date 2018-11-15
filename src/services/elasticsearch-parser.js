import * as globalVars from './global-vars';
import placeholderImage from '../images/book_placeholder.jpg';

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
      label: getESTitle(doc._source),
      description: getESDescription(doc._source)
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

/**
 * Returns 'description' from ElasticSearch data structure
 * For now, just returns the first description if there are multiples
 * @param {Object} _source
 * @return {String} A single description text string
 */
export function getESDescription(_source) {
  return _source.description && _source.description.length > 0
    ? _source.description[0]
    : '';
}

/**
 * Helper function to return an image url based on whether item is a Collection or Work
 * @param {Object} _source
 * @return {String} url string
 */
export function getESImagePath(
  _source,
  iiifParams = globalVars.IIIF_MEDIUM_ITEM_REGION
) {
  const imgUrl =
    _source.model.name === 'Collection'
      ? _source.thumbnail_iiif_url
      : _source.representative_file_url;

  const returnUrl = imgUrl === '' ? placeholderImage : `${imgUrl}${iiifParams}`;

  return returnUrl;
}

/**
 * Returns 'title' from ElasticSearch data structure, and handles multiple title formatting
 * @param {Object} _source
 * @return {String} A single title string
 */
export function getESTitle(_source) {
  if (!_source.title) {
    return '';
  }
  const { title } = _source;
  let titleArray = title.primary.map((title, i) => {
    return i > 0 ? `, ${title}` : title;
  });

  return titleArray.join('');
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
 * @return {Array} of prepped items
 */
export function prepPhotoGridItems(
  elasticsearchResponse,
  modelType,
  iiifParams = globalVars.IIIF_MEDIUM_ITEM_REGION
) {
  const iiifUrlKey = getIIIFUrlKey(modelType);
  const { hits } = elasticsearchResponse.hits;

  return hits.map(hit => ({
    id: hit._id,
    type: modelType,
    imageUrl: hit._source[iiifUrlKey]
      ? `${hit._source[iiifUrlKey]}${iiifParams}`
      : '',
    label: getESTitle(hit._source),
    description: getESDescription(hit._source)
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
