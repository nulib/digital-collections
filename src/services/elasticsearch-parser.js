import * as globalVars from "./global-vars";
import placeholderImage from "../images/book_placeholder.jpg";

function constructCarouselItems(docs, modelType) {
  const iiifUrlKey =
    modelType === globalVars.COLLECTION_MODEL
      ? "thumbnail_iiif_url"
      : "representative_file_url"; // this may not hold true as we get other types...

  const items = docs.map((doc) => {
    let obj = {
      id: doc._id,
      type: modelType,
      imageUrl: doc._source[iiifUrlKey]
        ? `${doc._source[iiifUrlKey]}${globalVars.IIIF_MEDIUM_ITEM_REGION}`
        : "",
      label: getESTitle(doc._source),
      description: getESDescription(doc._source),
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
    : "";
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
    _source.model.name === globalVars.COLLECTION_MODEL
      ? _source.thumbnail_iiif_url
      : _source.representative_file_url;

  const returnUrl = imgUrl === "" ? placeholderImage : `${imgUrl}${iiifParams}`;
  return returnUrl;
}

/**
 * Returns 'title' from ElasticSearch data structure, and handles multiple title formatting
 * @param {Object} _source
 * @return {String} A single title string
 */
export function getESTitle(_source) {
  if (!_source || !_source.title) {
    return "";
  }
  const { title } = _source;
  const titles = title.primary || title;
  let titleArray = titles.map((item, i) => {
    return i > 0 ? `, ${item}` : item;
  });

  return titleArray.join("");
}

export function getIIIFUrlKey(modelType) {
  return modelType === globalVars.COLLECTION_MODEL
    ? "thumbnail_iiif_url"
    : "representative_file_url";
}

/**
 * Map data from elastic search response, to what the PhotoGrid component needs
 * @param {Object} elasticsearchResponse Raw elastic search response object
 * @param {String} modelType // Item or Collection?
 * @param {String} iiifParams /// IIIF image sizing params to use - defaults to a medium region
 * @return {Array} of prepped items
 */
export function prepPhotoGridItems(
  sources,
  modelType,
  iiifParams = globalVars.IIIF_MEDIUM_ITEM_REGION
) {
  const iiifUrlKey = getIIIFUrlKey(modelType);

  return sources.map((source) => ({
    id: source.id,
    type: modelType,
    imageUrl: source[iiifUrlKey] ? `${source[iiifUrlKey]}${iiifParams}` : "",
    label: getESTitle(source),
    description: getESDescription(source),
  }));
}

/**
 * Map data from elastic search response, to what the PhotoFeature component needs
 * @param {Object} elasticsearchResponse Raw elastic search response object
 * @param {String} modelType // Item or Collection?
 * @param {String} iiifParams /// IIIF image sizing params to use - defaults to a medium region
 * @return {Array} of prepped items
 */
export function prepPhotoFeatureItems(
  sources,
  modelType,
  iiifParams = globalVars.IIIF_PHOTO_FEATURE_REGION
) {
  const iiifUrlKey = getIIIFUrlKey(modelType);

  return sources.map((source) => ({
    id: source.id,
    type: modelType,
    imageUrl: source[iiifUrlKey] ? `${source[iiifUrlKey]}${iiifParams}` : "",
    label: getESTitle(source),
    description: getESDescription(source),
  }));
}
