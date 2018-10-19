import { ELASTICSEARCH_PROXY_BASE } from '../services/global-vars';
import store from '../store';

const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: ELASTICSEARCH_PROXY_BASE + '/search'
  //log: 'trace'
});
const PAGE_SIZE = 500;

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
    index: 'common',
    headers: authHeader(),
    ignore: [404],
    type: '_all',
    id: id
  });
  return response;
}

export async function getCollection(id) {
  const response = await client.get({
    index: 'common',
    headers: authHeader(),
    ignore: [404],
    type: '_all',
    id: id
  });
  return response;
}

export async function getAllCollections() {
  const response = await client.search({
    index: 'common',
    headers: authHeader(),
    body: {
      size: PAGE_SIZE,
      query: {
        match: { 'model.name': 'Collection' }
      }
    }
  });
  return response;
}

export async function getCollectionItems(id) {
  const response = await client.search({
    index: 'common',
    headers: authHeader(),
    body: {
      size: PAGE_SIZE,
      query: {
        bool: {
          must: [
            { match: { 'model.name': 'Image' } },
            { match: { 'collection.id': id } }
          ]
        }
      }
    }
  });
  return response;
}

export async function getAdminSetItems(id) {
  const response = await client.search({
    index: 'common',
    headers: authHeader(),
    body: {
      size: PAGE_SIZE,
      query: {
        bool: {
          must: [
            { match: { 'model.name': 'Image' } },
            { match: { 'admin_set.id': id } }
          ]
        }
      }
    }
  });
  return response;
}

export async function getCollectionsByKeyword(keyword) {
  const response = await client.search({
    index: 'common',
    headers: authHeader(),
    body: {
      size: PAGE_SIZE,
      query: {
        bool: {
          must: [
            { match: { 'model.name': 'Collection' } },
            { match: { keyword: keyword } }
          ]
        }
      }
    }
  });
  return response;
}

export async function getRecentlyDigitizedItems(numResults = PAGE_SIZE) {
  const response = await client.search({
    index: 'common',
    headers: authHeader(),
    body: {
      size: numResults,
      query: {
        match: { 'model.name': 'Image' }
      }
    }
  });
  return response;
}
