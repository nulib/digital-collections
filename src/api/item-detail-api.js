import ApiClient from './client/api-client';
import MockClient from './client/mock-client';


export default class ItemDetailApi {
  constructor(){
    this.apiClient = new ApiClient();
    this.mockClient = new MockClient();
  }

  getItemDetails(id) {
    return this.apiClient.search(`q=${id}`);
  }

  getMockItemDetails() {
    return this.mockClient.getData('/json/item-detail.json')
      .then(response => {
        console.log('Item details mock response', response);
        return response;
      });
  }

  // just temporary - grab a placeholder image until we implement a viewer
  getIIIFImage(id) {
    const apiUrl = `/concern/images/${id}/manifest.json`

    return fetch(apiUrl)
      .then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
      return response;
    }).then(response => response.json())
      .then(response => {
        const sample_image_url = response.sequences[0].canvases[0].images[0].resource['@id']
        console.log(sample_image_url)
        return sample_image_url;
      })
    .catch(err => console.error(apiUrl, err.toString()))
  }
}
