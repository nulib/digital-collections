/**
 * Handle all fetch() network communication for Sets here
 * @class SetApiTest
 */
export default class SetsApi {

  apiCall(url) {
    return fetch(url, {
      headers : {
        "Content-Type": "application/json",
        "Accept": "application/json"
       }
    }).then(response => response.json())
      .then(results => {
        return results;
      })
      .catch(err => console.error(err.toString()));
  }

  getAllSets(setType) {
    let url = '';

    switch(setType) {
      case 'collections':
        // Here can specify a local .json file path, or a real endpoint
        url = '/json/collections.json';
        return this.apiCall(url);
      case 'creators':
        url = '/json/sets.json';
        return this.apiCall(url);
      case 'subjects':
        url = '/json/sets.json';
        return this.apiCall(url);
      case 'workTypes':
        url = '/json/sets.json';
        return this.apiCall(url);
      default:
        url = '/json/sets.json';
        return this.apiCall(url);
    }
  }

  getSet(setType, setId) {
    const url = '/json/set.json';
    return this.apiCall(url);
  }

  getSetItems() {
    const url = '/json/set-items.json';
    return this.apiCall(url);
  }

}
