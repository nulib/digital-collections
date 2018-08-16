import ApiClient from './client/api-client';

const apiClient = new ApiClient();

export function getSearchResults(searchTerm) {
  const queryPieces = [
    `has_model_ssim:(Image Collection)`,
    `title_tesim:${searchTerm}*`,
    `visibility_ssi:open`
  ];
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
