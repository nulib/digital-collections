import { ELASTICSEARCH_PROXY_BASE } from '../services/global-vars';
import store from '../store';
import Honeybadger from 'honeybadger-js';

const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: ELASTICSEARCH_PROXY_BASE + '/search'
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

async function asyncGetItem(id) {
  const response = await client.get({
    index: 'common',
    headers: authHeader(),
    ignore: [404],
    type: '_all',
    id: id
  });
  return response;
}

async function asyncGetCollection(id) {
  const response = await client.get({
    index: 'common',
    headers: authHeader(),
    ignore: [404],
    type: '_all',
    id: id
  });
  return response;
}

async function asyncGetAllCollections() {
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

async function asyncGetCollectionItems(id) {
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

async function asyncGetAdminSetItems(id) {
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

async function asyncGetCollectionsByKeyword(keyword) {
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

async function asyncGetRecentlyDigitizedItems() {
  const response = await client.search({
    index: 'common',
    headers: authHeader(),
    body: {
      size: PAGE_SIZE,
      query: {
        match: { 'model.name': 'Image' }
      }
    }
  });
  return response;
}

export const getItem = Honeybadger.wrap(asyncGetItem);
export const getCollection = Honeybadger.wrap(asyncGetCollection);
export const getAllCollections = Honeybadger.wrap(asyncGetAllCollections);
export const getCollectionItems = Honeybadger.wrap(asyncGetCollectionItems);
export const getAdminSetItems = Honeybadger.wrap(asyncGetAdminSetItems);
export const getCollectionsByKeyword = Honeybadger.wrap(
  asyncGetCollectionsByKeyword
);
export const getRecentlyDigitizedItems = Honeybadger.wrap(
  asyncGetRecentlyDigitizedItems
);
