/**
 * Handle all fetch() network communication for Sets here
 * @class SetApiTest
 */
export default class SetsApi {

  /**
   * Helper function to configure the solr query
   * @function getSetData
   * @param {string} setType - Type of set to retrieve, ie. 'collection, creator, subject, etc'
   * @return {Array}
   */
  getSetData(setType) {
    let items = [];

    switch(setType) {
      case 'collections':
        items = this.getCollections();
        break;
      case 'creators':
        items = this.getCreators();
        break;
      case 'subjects':
        items = this.getSubjects();
        break;
      case 'workTypes':
        items = this.getWorkTypes();
        break;
      default:
        items = [];
        break;
    }

    return items;
  }

  getCollections() {
    const mockCollections = [
      {
        id: '2a07f9e6-62fd-4287-a6ca-87ef97f047eb',
        label: 'Berkely Folk Festival',
        description: 'Click this item to get to "Set" page',
        posterImage: 'sample-little-richard.jpg'
      }, {
        id: 'beaffec8-ed52-4d49-88e0-fce7111e0d97',
        label: 'World War II Posters',
        description: 'Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero',
        posterImage: 'sample-wwII-collection.jpg'
      }, {
        id: '35a1815c-1f81-45ff-8165-b7249d782422',
        label: 'University Archives Postcards',
        description: 'This generically represents it could be a video or audio Collection',
        posterImage: 'sample-postcards-collection.jpg'
      }, {
        id: 'e77bdabf-a1da-4a53-a8d7-61950cc3595b',
        label: 'Ramón Casas sketchbooks',
        description: 'Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero',
        posterImage: 'sample-casas-collection.jpg'
      }
    ];

    return mockCollections;
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
