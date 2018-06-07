import ApiClient from './client/api-client';

const apiClient = new ApiClient();

export function getAllCollections() {
  // Actual Solr query: 'fq=has_model_ssim:Collection+AND+visibility_ssi:open&wt=json'
  const queryPieces = [`has_model_ssim:Collection`, `visibility_ssi:open`];
  return apiClient.search(queryStringBuilder(queryPieces));
}

export function getCollections(title) {
  const queryPieces = [
    `has_model_ssim:Collection`,
    `visibility_ssi:open`,
    `keyword_tesim:"${title}"`
  ];
  return apiClient.search(queryStringBuilder(queryPieces));
}

export function getCollectionItems(id) {
  // Actual Solr query `fq=has_model_ssim:Image+AND+member_of_collection_ids_ssim:${id}+AND+visibility_ssi:open&wt=json`;
  const queryPieces = [
    `has_model_ssim:Image`,
    `member_of_collection_ids_ssim:${id}`,
    `visibility_ssi:open`
  ];
  return apiClient.search(queryStringBuilder(queryPieces));
}

export function getItem(id) {
  const queryPieces = [`id:${id}`, `visibility_ssi:open`];
  return apiClient.search(queryStringBuilder(queryPieces));
}

export function getRecentlyDigitizedItems() {
  const queryPieces = [`has_model_ssim:Image`];
  return apiClient.search(queryStringBuilder(queryPieces));
}

/**
 * Helper function which constructs a Solr query string
 * @param  {[String]} arr An array of strings which represent Solr key/value pairs.  Ie. 'has_model_ssim:Image'
 * @return {String}     Properly formatted Solr query string
 */
function queryStringBuilder(arr) {
  let queryString = `fq=`;

  arr.forEach((val, i) => (queryString += (i > 0 ? `+AND+` : ``) + `${val}`));
  queryString += `&wt=json`;
  return queryString;
}
