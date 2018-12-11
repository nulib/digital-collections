import ApiClient from './client/api-client';

const apiClient = new ApiClient();

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

export async function getManifest(url) {
  console.log('url', url);
  try {
    let response = await fetch(url);
    let manifest = await response.json();

    return manifest;
  } catch (err) {
    console.log('Error fetching manifest:', err);
    return Promise.resolve({ error: err });
  }
}
