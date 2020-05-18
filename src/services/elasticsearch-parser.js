import * as globalVars from "./global-vars";
import placeholderImage from "../images/book_placeholder.jpg";

export function buildImageUrl(
  source,
  modelType,
  iiifParams = globalVars.IIIF_MEDIUM_ITEM_REGION
) {
  const idKey =
    modelType === globalVars.IMAGE_MODEL
      ? source.representative_file_set.url
      : "";
  return idKey ? `${idKey}${iiifParams}` : "";
}

function constructCarouselItems(docs, modelType) {
  const iiifUrlKey =
    modelType === globalVars.COLLECTION_MODEL
      ? "thumbnail_iiif_url"
      : "representative_file_url"; // this may not hold true as we get other types...

  const items = docs.map(doc => {
    let obj = {
      id: doc._id,
      type: modelType,
      imageUrl: doc._source[iiifUrlKey]
        ? `${doc._source[iiifUrlKey]}${globalVars.IIIF_MEDIUM_ITEM_REGION}`
        : "",
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
export function getESDescription(source) {
  return source.description || "No description";
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
export function getESTitle(source) {
  return source.title || "No title exists";
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
  return sources.map(source => ({
    id: source.id,
    type: modelType,
    imageUrl: buildImageUrl(source, modelType, iiifParams),
    label: source.title || "",
    description: source.description || ""
  }));
}
