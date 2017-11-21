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

  /**
   * Helper function to configure the solr query
   * @function getAllSets
   * @param {string} setType - Type of set to retrieve, ie. 'collection, creator, subject, etc'
   * @return {Array}
   */
  getAllSets(setType) {
    let items = [];
    let url = '';

    switch(setType) {
      case 'collections':
        // Here can specify a local .json file path, or a real endpoint
        url = '/json/collections.json';
        return this.apiCall(url);
        break;
      case 'creators':
        url = '/json/collections.json';
        return this.apiCall(url);
      case 'subjects':
        url = '/json/collections.json';
        return this.apiCall(url);
      case 'workTypes':
        url = '/json/collections.json';
        return this.apiCall(url);
      default:
        url = '/json/collections.json';
        return this.apiCall(url);
    }
  }

  getSet(setType, setId) {
    const url = '/json/set-item.json';
    return this.apiCall(url);
  }

  getSetItems() {
    const url = '/json/collection-items.json';
    return this.apiCall(url);
  }

  getCreators() {
    const mockCreators = [
      {
        id: '060e5c19-2164-4774-a0f0-9da194d235d5',
        label: 'Creator #1',
        description: 'Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero',
        posterImage: '265x265.png'
      }, {
        id: 'f84518d8-1d32-4dfe-bfcc-ed4440c7f52d',
        label: 'Creator #2',
        description: 'Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero',
        posterImage: '265x265.png'
      }, {
        id: '0c8932be-cd99-4b6b-b843-4886a90c6e63',
        label: 'Creator #3',
        description: 'Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero',
        posterImage: '265x265.png'
      }, {
        id: 'c35b035d-9541-4308-bf4d-971f538bdd34',
        label: 'Creator #4',
        description: 'Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero',
        posterImage: '265x265.png'
      }
    ];

    return mockCreators;
  }

  getSubjects() {
    const mockSubjects = [
      {
        id: '94985aeb-8388-43fc-aeb3-270859adfce3',
        label: 'Subject #1',
        description: 'Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero',
        posterImage: '265x265.png'
      }, {
        id: '8e645765-3f52-4ca8-b686-f726c3a84ca2',
        label: 'Subject #2',
        description: 'Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero',
        posterImage: '265x265.png'
      }, {
        id: '62115d33-0806-45e7-a372-e3f698ad8b3c',
        label: 'Subject #3',
        description: 'Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero',
        posterImage: '265x265.png'
      }, {
        id: '2df9fd6a-47ae-48b9-b6e1-6e12f29b19c2',
        label: 'Subject #4',
        description: 'Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero',
        posterImage: '265x265.png'
      }
    ];

    return mockSubjects;
  }

  getWorkTypes() {
    const mockWorkTypes = [
      {
        id: 'bb007c05-00b2-44c6-9878-fe7de6e74764',
        label: 'WorkType #1',
        description: 'Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero',
        posterImage: '265x265.png'
      }, {
        id: 'b3ebac4b-7839-4b26-89b7-a558cf24da58',
        label: 'WorkType #2',
        description: 'Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero',
        posterImage: '265x265.png'
      }, {
        id: '61273a1e-a649-4813-b4bb-cf7f8dc4ebc2',
        label: 'WorkType #3',
        description: 'Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero',
        posterImage: '265x265.png'
      }, {
        id: 'fefc7df8-0a6f-4904-9931-7f8109e443f9',
        label: 'WorkType #4',
        description: 'Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero',
        posterImage: '265x265.png'
      }
    ];

    return mockWorkTypes;
  }
}
