import ApiClient from './client/api_client';
import MockClient from './client/mock_client';


export default class ItemDetailApi {

  constructor(){
    this.mocks = false;
    this.ApiClient = new ApiClient();
    this.MockClient = new MockClient();
  }

  getItemDetails(id) {
    if (this.mocks) {
      return this.MockClient.getData('/json/item-detail.json').then(response => {
        console.log(response)
        return response;
      })
        .catch(err => console.error(err.toString()));
    } else {
      return this.ApiClient.search(`q=${id}`).then(results => {
        console.log(results)
        return results;
    })
      .catch(err => console.error(this.ApiClient.api_base, err.toString()))
    }
  }

  // just temporary - grab a placeholder image until we implement a viewer
  getIIIFImage(id) {
    const api_url = `/concern/images/${id}/manifest.json`
    return fetch(api_url)
      .then(response => response.json())
      .then(response => {
        const sample_image_url = response.sequences[0].canvases[0].images[0].resource['@id']
        console.log(sample_image_url)
        return sample_image_url;
      })
    .catch(err => console.error(api_url, err.toString()))
  }



}
