import ApiClient from './client/api-client';

/**
 * Handle all fetch() network communication for Sets here
 * @class SetApiTest
 */
export default class CollectionsApi {

  constructor() {
    this.apiClient = new ApiClient();
  }

  /**
   * Helper function to configure the solr query
   * @function getAllCollections
   * @return {Array}
   */
  getAllCollections() {
    const strQuery = 'fq=has_model_ssim:Collection+AND+visibility_ssi:open&wt=json'
    return this.apiClient.search(strQuery);
  }

  getCollection(id) {
    const strQuery = `q=${id}`
    return this.apiClient.search(strQuery)
  }

  getCollectionItems(id) {
    const strQuery = `fq=has_model_ssim:Image+AND+member_of_collection_ids_ssim:${id}+AND+visibility_ssi:open&wt=json`;
    return this.apiClient.search(strQuery)
  }

}
