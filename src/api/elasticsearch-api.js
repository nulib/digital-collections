import { ELASTICSEARCH_PROXY_BASE } from '../services/global-vars';
import store from '../store';

const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: ELASTICSEARCH_PROXY_BASE + '/search'
  //log: 'trace'
});
const PAGE_SIZE = 500;
const getObjBase = {
  index: 'common',
  headers: authHeader()
};
const sortKey = {
  sort: [
    {
      modified_date: {
        order: 'desc'
      }
    }
  ]
};

function authHeader(headers = {}) {
  let result = {};
  let state = store.getState();
  if (state.auth.token) {
    result['Authorization'] = 'Bearer ' + state.auth.token;
  }
  return Object.assign(headers, result);
}

export async function getItem(id) {
  const response = await client.get({
    ...getObjBase,
    ignore: [404],
    type: '_all',
    id: id
  });
  return response;
}

export async function getCollection(id) {
  const response = await client.get({
    ...getObjBase,
    ignore: [404],
    type: '_all',
    id: id
  });
  return response;
}

export async function getAllCollections(numResults = PAGE_SIZE) {
  const response = await client.search({
    ...getObjBase,
    body: {
      size: numResults,
      query: {
        match: { 'model.name': 'Collection' }
      },
      sort: [
        {
          'title.primary.keyword': {
            order: 'asc'
          }
        }
      ]
    }
  });
  return response;
}

export async function getCollectionItems(id, numResults = PAGE_SIZE) {
  const response = await client.search({
    ...getObjBase,
    body: {
      size: numResults,
      query: {
        bool: {
          must: [
            { match: { 'model.name': 'Image' } },
            { match: { 'collection.id': id } }
          ]
        }
      },
      ...sortKey
    }
  });
  return response;
}

export async function getAdminSetItems(id, numResults = PAGE_SIZE) {
  const response = await client.search({
    ...getObjBase,
    body: {
      size: numResults,
      query: {
        bool: {
          must: [
            { match: { 'model.name': 'Image' } },
            { match: { 'admin_set.id': id } }
          ]
        }
      },
      ...sortKey
    }
  });
  return response;
}

export async function getCollectionsByKeyword(keyword, numResults = PAGE_SIZE) {
  const response = await client.search({
    ...getObjBase,
    body: {
      size: numResults,
      query: {
        bool: {
          must: [
            { match: { 'model.name': 'Collection' } },
            { match: { keyword: keyword } }
          ]
        }
      },
      ...sortKey
    }
  });
  return response;
}

/**
 * Get all Work items from indexer
 * @param {Number} numResults - Function caller can specify how many results they want back
 */
export async function getRecentlyDigitizedItems(numResults = PAGE_SIZE) {
  const response = await client.search({
    ...getObjBase,
    body: {
      size: numResults,
      query: {
        match: { 'model.name': 'Image' }
      },
      ...sortKey
    }
  });
  return response;
}
