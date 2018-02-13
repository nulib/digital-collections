import MockClient from './client/mock-client';

export default class SetsApi {
  constructor() {
    this.mockClient = new MockClient();
  }

  getAllSets(setType) {
    let url = '';

    switch (setType) {
      case 'collections':
        // Here can specify a local .json file path, or a real endpoint
        url = '/json/collections.json';
        return this.apiCall(url);
      default:
        url = '/json/sets.json';
        return this.mockClient.getData(url);
    }
  }

  getSet(setType, setId) {
    const url = '/json/set.json';
    return this.mockClient.getData(url);
  }

  getSetItems() {
    const url = '/json/set-items.json';
    return this.mockClient.getData(url);
  }
}
