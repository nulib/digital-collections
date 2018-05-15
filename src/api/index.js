import ApiClient from './client/api-client';

/**
 * Handle all fetch() network communication for Collections here
 * @class Api
 */
export default class Api {
  constructor() {
    this.apiClient = new ApiClient();
  }

  getAllCollections() {
    // Actual Solr query: 'fq=has_model_ssim:Collection+AND+visibility_ssi:open&wt=json'
    const queryPieces = [`has_model_ssim:Collection`, `visibility_ssi:open`];
    return this.apiClient.search(this.queryStringBuilder(queryPieces));
  }

  getCollections(title) {
    const queryPieces = [
      `has_model_ssim:Collection`,
      `visibility_ssi:open`,
      `keyword_tesim:"${title}"`
    ];
    return this.apiClient.search(this.queryStringBuilder(queryPieces));
  }

  getCollectionItems(id) {
    // Actual Solr query `fq=has_model_ssim:Image+AND+member_of_collection_ids_ssim:${id}+AND+visibility_ssi:open&wt=json`;
    const queryPieces = [
      `has_model_ssim:Image`,
      `member_of_collection_ids_ssim:${id}`,
      `visibility_ssi:open`
    ];
    return this.apiClient.search(this.queryStringBuilder(queryPieces));
  }

  getRecentlyDigitizedItems() {
    const queryPieces = [`has_model_ssim:Image`];
    return this.apiClient.search(this.queryStringBuilder(queryPieces));
  }

  /**
   * Helper function which constructs a Solr query string
   * @param  {[String]} arr An array of strings which represent Solr key/value pairs.  Ie. 'has_model_ssim:Image'
   * @return {String}     Properly formatted Solr query string
   */
  queryStringBuilder(arr) {
    let queryString = `fq=`;

    arr.forEach((val, i) => (queryString += (i > 0 ? `+AND+` : ``) + `${val}`));
    queryString += `&wt=json`;
    return queryString;
  }
}

// Berkeley collection id: 1baab830-e95f-473c-9d8f-5bd216610bd8
