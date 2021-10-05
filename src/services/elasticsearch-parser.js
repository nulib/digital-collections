import * as globalVars from "./global-vars";
import placeholderImage from "../images/book_placeholder.jpg";

export function buildImageUrl(
  source,
  modelType,
  iiifParams = globalVars.IIIF_MEDIUM_ITEM_REGION
) {
  const idKey =
    modelType === globalVars.IMAGE_MODEL || modelType === globalVars.WORK_MODEL
      ? source.representativeFileSet
        ? source.representativeFileSet.url
        : ""
      : "";
  return idKey ? `${idKey}${iiifParams}` : "";
}

function constructCarouselItems(docs, modelType) {
  const iiifUrlKey =
    modelType === globalVars.COLLECTION_MODEL
      ? "thumbnail_iiif_url"
      : "representativeFileSet"; // this may not hold true as we get other types...

  const items = docs.map((doc) => {
    let obj = {
      id: doc._id,
      type: modelType,
      imageUrl: doc._source[iiifUrlKey]
        ? `${doc._source[iiifUrlKey]["url"]}${globalVars.IIIF_MEDIUM_ITEM_REGION}`
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
export function getESDescription(source) {
  if (
    source.descriptiveMetadata &&
    source.descriptiveMetadata.description.length > 0
  )
    return source.descriptiveMetadata.description;
  return "";
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
  let imgUrl = "";
  if (_source.model && _source.model.name === globalVars.COLLECTION_MODEL) {
    imgUrl = _source.representativeImage ? _source.representativeImage.url : "";
  }
  if (
    _source.model &&
    (_source.model.name === globalVars.IMAGE_MODEL ||
      _source.model.name === globalVars.WORK_MODEL)
  ) {
    imgUrl = _source.representativeFileSet
      ? _source.representativeFileSet.url
      : "";
  }
  const returnUrl = imgUrl ? `${imgUrl}${iiifParams}` : "";
  return returnUrl;
}

/**
 * Returns 'title' from ElasticSearch data structure, and handles multiple title formatting
 * @param {Object} _source
 * @return {String} A single title string
 */
export function getESTitle(source, isCollection) {
  if (!source) return "";
  if (isCollection) {
    return source.title || "";
  } else {
    return source.descriptiveMetadata.title || "";
  }
}

export function getIIIFUrlKey(modelType) {
  return modelType === globalVars.COLLECTION_MODEL
    ? "representativeImage"
    : "representativeFileSet";
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
    imageUrl: source[iiifUrlKey]
      ? `${source[iiifUrlKey].url}${iiifParams}`
      : "",
    label: getESTitle(source, modelType === "Collection"),
    description: getESDescription(source),
  }));
}

/**
 * Map data from elastic search response, to what the PhotoGrid component needs
 * @param {Array} sources Array of elasticsearch response objects
 * @param {String} modelType // Item or Collection?
 * @param {String} iiifParams /// IIIF image sizing params to use - defaults to a medium region
 * @return {Array} of prepped items
 */
export function prepPhotoGridItems(
  sources,
  modelType,
  iiifParams = globalVars.IIIF_MEDIUM_ITEM_REGION
) {
  return sources.map((source) => ({
    id: source.id,
    imageUrl: getESImagePath(source),
    label: source.descriptiveMetadata
      ? source.descriptiveMetadata.title
      : source.title,
    description: source.descriptiveMetadata
      ? source.descriptiveMetadata.description[0]
      : source.description,
    modelName: modelType,
    workType: source.workType?.id,
  }));
}
